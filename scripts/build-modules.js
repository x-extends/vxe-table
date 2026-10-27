/**
 * 极速构建:
 *   <SRC>/**\/*.ts              ->  <OUT_ES>/**\/*.js (ESM) + .d.ts
 *                              ->  <OUT_LIB>/**\/*.js (CJS)
 *   styles/components/*.scss   ->  <OUT_ES>/<name>/style[.mini].css
 *                              ->  <OUT_LIB>/<name>/style/style[.mini].css
 *                              ->  <OUT_LIB>/<name>/style/index.js（require('./style.css')）
 *   styles/icon/*              ->  <OUT_ES>/*   （平铺到根目录，iconfont.* 加 buildTime；可由 doIcon 关闭）
 *                              ->  <OUT_LIB>/*  （平铺到根目录，iconfont.* 加 buildTime；可由 doIcon 关闭）
 *                              ->  <OUT_DIST>/* （平铺到根目录，iconfont.* 加 buildTime；可由 doIcon 关闭）
 *   <SRC>/<localeDir>/*.ts     ->  <LOCALE_OUT>/*.umd.js（UMD 语言包）
 *   <SRC>/index.ts             ->  <OUT_DIST>/all.esm.js（bundle 单文件）
 *                              ->  <OUT_LIB>/<UMD_FILE>[.min].js（兼容旧版 Webpack 的 UMD 产物）
 *   styles/all.scss            ->  <OUT_DIST>/style.css + style.mini.css
 *                              ->  <OUT_LIB>/style.css + style.mini.css
 */

const fs = require('fs')
const fsp = fs.promises
const path = require('path')
const os = require('os')
const { spawn } = require('child_process')
const esbuild = require('esbuild')
const sass = require('sass-embedded')
const XEUtils = require('xe-utils')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')

const pack = require('../package.json')
const tsconfig = require('../tsconfig.json')

const {
  // 目录
  src: SRC,
  srcTmpl: SRC_TMPL,
  outEs: OUT_ES,
  outLib: OUT_LIB,
  outDist: OUT_DIST,
  doClean: DO_CLEAN,
  componentPrefix,
  localeDir: LOCALE_DIR_REL,
  localeOut,
  doLocale: DO_LOCALE,
  // 图标资源
  doIcon: DO_ICON,
  // UMD
  doUmd: DO_UMD,
  componentList,
  exportModuleName,
  externalGlobals,
  umdEntry,
  umdFile,
  umdMinFile,
  doStripDefineWrapper,
  // 构建时间戳（用于 iconfont 文件改名，避免浏览器缓存）
  buildTime
} = require('./build-config')

/* ======================== 常量 ======================== */
const DEFINE = {
  'process.env.VUE_APP_VXE_VERSION': JSON.stringify(pack.version),
  'process.env.VUE_APP_VXE_ENV': 'process.env.NODE_ENV'
}

const ROOT = path.resolve(__dirname, '..')
const SRC_DIR = path.resolve(ROOT, SRC)
const SRC_TMPL_DIR = path.resolve(ROOT, SRC_TMPL)
const STYLES_DIR = path.resolve(ROOT, 'styles')
const ICON_DIR = path.join(STYLES_DIR, 'icon')
const TSCONFIG = path.join(ROOT, 'tsconfig.json')
const ES_DIR = path.resolve(ROOT, OUT_ES)
const LIB_DIR = path.resolve(ROOT, OUT_LIB)
const DIST_DIR = path.resolve(ROOT, OUT_DIST)

const LOCALE_DIR_TMPL = path.resolve(SRC_TMPL_DIR, LOCALE_DIR_REL)
const LOCALE_OUT_DIR = path.resolve(ROOT, localeOut)

// iconfont 资源改名相关
const ICON_FONT_BASE = 'iconfont'
const FONT_EXTS = new Set(['.ttf', '.otf', '.woff', '.woff2', '.eot', '.svg'])

const rel = p => path.relative(ROOT, p).replace(/\\/g, '/') || '.'

/* --------------------------- 前置校验 --------------------------- */
function assertNotSame (a, b, label) {
  if (a === b) { console.error(`[build] ${label} 不能相同: ${rel(a)}`); process.exit(1) }
}
assertNotSame(ES_DIR, LIB_DIR, 'OUT_ES 与 OUT_LIB')
assertNotSame(SRC_DIR, ES_DIR, 'SRC 与 OUT_ES')
assertNotSame(SRC_DIR, LIB_DIR, 'SRC 与 OUT_LIB')
assertNotSame(SRC_DIR, DIST_DIR, 'SRC 与 OUT_DIST')
assertNotSame(SRC_TMPL_DIR, SRC_DIR, 'SRC_TMPL 与 SRC')
assertNotSame(SRC_TMPL_DIR, ES_DIR, 'SRC_TMPL 与 OUT_ES')
assertNotSame(SRC_TMPL_DIR, LIB_DIR, 'SRC_TMPL 与 OUT_LIB')
assertNotSame(SRC_TMPL_DIR, DIST_DIR, 'SRC_TMPL 与 OUT_DIST')

function capitalize (str) {
  if (!str) return str
  return str[0].toUpperCase() + str.slice(1)
}

/**
 * 把任意字符串（如包名 '@vxe-ui/core'）转成合法的 JS 标识符。
 * 只用于 UMD 工厂函数的形参名，对外部使用者的 API 没有任何影响。
 */
function toSafeIdent (input) {
  let id = String(input).replace(/[^a-zA-Z0-9_$]/g, '_')
  if (!id) id = '_mod'
  if (/^[0-9]/.test(id)) id = '_' + id
  return id
}

/* --------------------------- CSS 处理 --------------------------- */
async function processCss (rawCss) {
  const { css } = await postcss([autoprefixer()]).process(rawCss, { from: undefined })
  const { code: cssMin } = await esbuild.transform(css, {
    loader: 'css',
    minify: true
  })
  return { css, cssMin }
}

/* ------------------------------ IO ------------------------------ */

async function walk (dir, filter) {
  const out = []
  async function visit (d) {
    let entries
    try { entries = await fsp.readdir(d, { withFileTypes: true }) } catch { return }
    await Promise.all(entries.map(async e => {
      if (e.name === 'node_modules' || e.name.startsWith('.')) return
      const full = path.join(d, e.name)
      if (e.isDirectory()) return visit(full)
      if (!filter || filter(full)) out.push(full)
    }))
  }
  await visit(dir)
  return out.sort()
}

function run (cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: 'inherit', ...opts })
    p.on('error', reject)
    p.on('exit', code => (code === 0 ? resolve() : reject(new Error(`${cmd} exit ${code}`))))
  })
}

/* --------------------------- 临时工作区 --------------------------- */

async function copySrcToTmpl () {
  await fsp.rm(SRC_TMPL_DIR, { recursive: true, force: true })
  await fsp.cp(SRC_DIR, SRC_TMPL_DIR, {
    recursive: true,
    dereference: true,
    filter: src => {
      const base = path.basename(src)
      return base !== 'node_modules' && !base.startsWith('.')
    }
  })
}

async function generateAliasSources () {
  const results = await Promise.all(componentList.map(async name => {
    const compDir = path.join(SRC_TMPL_DIR, name)
    let stat
    try { stat = await fsp.stat(compDir) } catch { return null }
    if (!stat.isDirectory()) return null

    const libName = `${componentPrefix}-${name}`
    const aliasDir = path.join(SRC_TMPL_DIR, libName)
    await fsp.mkdir(aliasDir, { recursive: true })

    const expName = capitalize(XEUtils.camelCase(libName))
    const code = `import ${expName} from '../${name}'\n\nexport default ${expName}\nexport * from '../${name}'\n`
    await fsp.writeFile(path.join(aliasDir, 'index.ts'), code)
    return `${libName}/index.ts`
  }))
  return results.filter(Boolean)
}

/* ------------------------------ 样式编译 ------------------------------ */
function buildCssIcon (rawCss) {
  return rawCss.replace('url("./icon/iconfont.woff2")', `url("./iconfont.${buildTime}.woff2")`)
    .replace('url("./icon/iconfont.woff")', `url("./iconfont.${buildTime}.woff")`)
    .replace('url("./icon/iconfont.ttf")', `url("./iconfont.${buildTime}.ttf")`)
}

async function buildStyles () {
  const sassOpts = {
    loadPaths: [STYLES_DIR, path.join(ROOT, 'node_modules')],
    silenceDeprecations: ['import', 'legacy-js-api']
  }

  const results = await Promise.all(componentList.map(async name => {
    const scssFile = path.join(STYLES_DIR, 'components', `${name}.scss`)
    let stat
    try { stat = await fsp.stat(scssFile) } catch { return null }
    if (!stat.isFile()) return null

    let css, cssMin
    try {
      let rawCss = (await sass.compileAsync(scssFile, { ...sassOpts, style: 'expanded' })).css
      if (DO_ICON) {
        rawCss = buildCssIcon(rawCss)
      }
      const processed = await processCss(rawCss)

      css = processed.css
      cssMin = processed.cssMin
    } catch (e) {
      throw new Error(`样式编译失败 ${rel(scssFile)}: ${e.message}`)
    }

    const esDir = path.join(ES_DIR, name)
    const compEsDir = path.join(ES_DIR, `${componentPrefix}-${name}`)
    const libStyleDir = path.join(LIB_DIR, name, 'style')
    const compLibStyleDir = path.join(LIB_DIR, `${componentPrefix}-${name}`, 'style')

    await Promise.all([
      fsp.mkdir(esDir, { recursive: true }),
      fsp.mkdir(compEsDir, { recursive: true }),
      fsp.mkdir(libStyleDir, { recursive: true }),
      fsp.mkdir(compLibStyleDir, { recursive: true })
    ])

    await Promise.all([
      // ESM
      fsp.writeFile(path.join(esDir, 'style.css'), css),
      fsp.writeFile(path.join(compEsDir, 'style.css'), css),
      fsp.writeFile(path.join(esDir, 'style.mini.css'), cssMin),
      fsp.writeFile(path.join(compEsDir, 'style.mini.css'), cssMin),
      // CJS
      fsp.writeFile(path.join(libStyleDir, 'style.css'), css),
      fsp.writeFile(path.join(compLibStyleDir, 'style.css'), css),
      fsp.writeFile(path.join(libStyleDir, 'style.mini.css'), cssMin),
      fsp.writeFile(path.join(compLibStyleDir, 'style.mini.css'), cssMin),
      // 兼容旧版：<OUT_LIB>/<name>/style/index.js
      fsp.writeFile(path.join(libStyleDir, 'index.js'), "require('./style.css')\n"),
      fsp.writeFile(path.join(compLibStyleDir, 'index.js'), "require('./style.css')\n")
    ])
    return name
  }))
  return results.filter(Boolean)
}

async function buildDistStyle () {
  const scssFile = path.join(STYLES_DIR, 'all.scss')
  let stat
  try { stat = await fsp.stat(scssFile) } catch { return null }
  if (!stat.isFile()) return null

  const sassOpts = {
    loadPaths: [STYLES_DIR, path.join(ROOT, 'node_modules')],
    silenceDeprecations: ['import', 'legacy-js-api']
  }

  let css, cssMin
  try {
    let rawCss = (await sass.compileAsync(scssFile, { ...sassOpts, style: 'expanded' })).css
    if (DO_ICON) {
      rawCss = buildCssIcon(rawCss)
    }
    const processed = await processCss(rawCss)
    css = processed.css
    cssMin = processed.cssMin
  } catch (e) {
    throw new Error(`样式编译失败 ${rel(scssFile)}: ${e.message}`)
  }

  await Promise.all([
    fsp.mkdir(ES_DIR, { recursive: true }),
    fsp.mkdir(DIST_DIR, { recursive: true }),
    fsp.mkdir(LIB_DIR, { recursive: true })
  ])

  await Promise.all([
    fsp.writeFile(path.join(ES_DIR, 'style.css'), css),
    fsp.writeFile(path.join(ES_DIR, 'style.mini.css'), cssMin),
    fsp.writeFile(path.join(DIST_DIR, 'style.css'), css),
    fsp.writeFile(path.join(DIST_DIR, 'style.mini.css'), cssMin),
    fsp.writeFile(path.join(LIB_DIR, 'style.css'), css),
    fsp.writeFile(path.join(LIB_DIR, 'style.mini.css'), cssMin)
  ])
}

/* ------------------------------ 图标资源复制 ------------------------------ */

/**
 * 把 styles/icon 下所有文件平铺复制到 ES_DIR / LIB_DIR / DIST_DIR 根目录。
 * - `iconfont.*` 文件会加 buildTime，例如 `iconfont.ttf` -> `iconfont.${buildTime}.ttf`
 * - 复制前会清理输出根目录下旧的 `iconfont.<非当前buildTime>.<font-ext>` 文件
 * - 不会清理输出目录其他产物
 * - 由 doIcon 开关控制是否执行（在 main 中判断）
 */
function getRenamedRelPath (relPath) {
  const base = path.basename(relPath)
  const ext = path.extname(base)
  const name = base.slice(0, base.length - ext.length)
  if (name !== ICON_FONT_BASE) return relPath
  const dir = path.dirname(relPath)
  const newBase = `${name}.${buildTime}${ext}`
  return dir === '.' ? newBase : path.join(dir, newBase)
}

async function cleanupOldIconFonts (dir) {
  let entries
  try { entries = await fsp.readdir(dir, { withFileTypes: true }) } catch { return }
  const current = String(buildTime)
  await Promise.all(entries.map(async e => {
    if (!e.isFile()) return
    if (!e.name.startsWith(`${ICON_FONT_BASE}.`)) return
    const ext = path.extname(e.name).toLowerCase()
    if (!FONT_EXTS.has(ext)) return
    // iconfont.<version>.<ext> 中的 version 部分
    const mid = e.name.slice(ICON_FONT_BASE.length + 1, e.name.length - ext.length)
    // 无版本号（如 iconfont.ttf）或当前版本 → 保留
    if (!mid || mid === current) return
    await fsp.unlink(path.join(dir, e.name)).catch(() => { })
  }))
}

async function copyIconAssets () {
  let stat
  try { stat = await fsp.stat(ICON_DIR) } catch { return null }
  if (!stat.isDirectory()) return null

  const files = await walk(ICON_DIR, () => true)
  if (!files.length) return null

  const outDirs = [ES_DIR, LIB_DIR, DIST_DIR]

  if (DO_ICON) {
    let hasIcon = false
    try {
      const st = await fsp.stat(path.join(SRC_TMPL_DIR, 'icon'))
      hasIcon = st.isDirectory()
    } catch { }
    // 判断是否有 icon 组件
    if (hasIcon) {
      // ES 侧：CSS 在 <ES_DIR>/<name>/style.css，字体需放到 <ES_DIR>/<name>/
      outDirs.push(
        path.join(ES_DIR, 'icon'),
        path.join(ES_DIR, `${componentPrefix}-icon`)
      )
      // LIB 侧：CSS 在 <LIB_DIR>/<name>/style/style.css，字体需放到 <LIB_DIR>/<name>/style/
      outDirs.push(
        path.join(LIB_DIR, 'icon', 'style'),
        path.join(LIB_DIR, `${componentPrefix}-icon`, 'style')
      )
    }
  }

  await Promise.all(outDirs.map(d => cleanupOldIconFonts(d)))

  await Promise.all(files.flatMap(file => {
    const relPath = path.relative(ICON_DIR, file)
    const outRelPath = getRenamedRelPath(relPath)
    return outDirs.map(dir => {
      const target = path.join(dir, outRelPath)
      return fsp.mkdir(path.dirname(target), { recursive: true })
        .then(() => fsp.copyFile(file, target))
    })
  }))
}

/* ------------------------------ 移除 defineVxeComponent 包裹 ------------------------------ */

// defineVxeComponent 包裹移除相关
const SRC_TMPL_PREFIX = SRC_TMPL_DIR + path.sep
const DEFINE_VXE_COMPONENT_START = '/* define-vxe-component start */ defineVxeComponent({'

/**
 * 组件源码以如下形式书写：
 *
 *   export default /* define-vxe-component start *\/ defineVxeComponent({
 *     // 组件选项
 *   }) /* define-vxe-component end *\/
 *
 * 编译后移除包裹，仅保留内部组件选项对象：
 *
 *   export default {
 *     // 组件选项
 *   };
 *
 * 说明：
 * - 未匹配时静默保留原样（运行时仍可工作）
 * - 只匹配一半时语法错误，esbuild 会直接报错
 * - .d.ts 由 tsc 生成，不经过此插件，类型约束完整保留
 */
function stripDefineVxeComponent (source) {
  return source
    // 1. 移除起包裹，保留内部对象
    .replace(DEFINE_VXE_COMPONENT_START, '{')
    // 2. 结尾兼容「有分号 / 无分号」两种写法，并补上分号避免 ASI 边界问题
    .replace(/\}\)\s*;?\s*\/\*\s*define-vxe-component end\s*\*\//, '};')
}

const stripDefineVxeComponentPlugin = {
  name: 'strip-define-vxe-component',
  setup (build) {
    build.onLoad({ filter: /\.(ts|tsx)$/ }, async args => {
      // 只处理临时目录内的源码，不碰 node_modules
      if (!args.path.startsWith(SRC_TMPL_PREFIX)) return null
      const source = await fsp.readFile(args.path, 'utf8')
      if (!source.includes(DEFINE_VXE_COMPONENT_START)) return null
      return {
        contents: stripDefineVxeComponent(source),
        loader: args.path.endsWith('.tsx') ? 'tsx' : 'ts'
      }
    })
  }
}

/* ------------------------------ Bundle（all.esm.js） ------------------------------ */

const scssStubPlugin = {
  name: 'scss-stub',
  setup (build) {
    build.onResolve({ filter: /\.(scss|sass|css|less|styl)$/ }, args => ({
      path: args.path,
      namespace: 'scss-stub'
    }))
    build.onLoad({ filter: /.*/, namespace: 'scss-stub' }, () => ({
      contents: 'export default {}',
      loader: 'js'
    }))
  }
}

async function buildBundle () {
  const entry = path.join(SRC_TMPL_DIR, 'index.ts')
  let stat
  try { stat = await fsp.stat(entry) } catch { return null }
  if (!stat.isFile()) return null

  await fsp.mkdir(DIST_DIR, { recursive: true })

  const srcPlugins = doStripDefineWrapper ? [stripDefineVxeComponentPlugin] : []

  const outFile = path.join(DIST_DIR, 'all.esm.js')
  const minOutFile = path.join(DIST_DIR, 'all.esm.min.js')

  await esbuild.build({
    entryPoints: [entry],
    outfile: outFile,
    bundle: true,
    format: 'esm',
    packages: 'external',
    target: 'es2018',
    platform: 'neutral',
    sourcemap: false,
    logLevel: 'error',
    keepNames: false,
    charset: 'utf8',
    treeShaking: true,
    tsconfig: TSCONFIG,
    loader: { '.ts': 'ts', '.tsx': 'tsx' },
    define: DEFINE,
    plugins: [scssStubPlugin, ...srcPlugins]
  })

  // 生成 min 版本
  const code = await fsp.readFile(outFile, 'utf8')
  const { code: minCode } = await esbuild.transform(code, {
    loader: 'js',
    minify: true,
    target: 'es2018',
    charset: 'utf8',
    format: 'esm'
  })
  await fsp.writeFile(minOutFile, minCode)
}

/* ------------------------------ UMD Bundle ------------------------------ */

async function buildUmdBundle () {
  const entry = path.join(SRC_TMPL_DIR, umdEntry)
  let stat
  try { stat = await fsp.stat(entry) } catch { return null }
  if (!stat.isFile()) return null

  await fsp.mkdir(LIB_DIR, { recursive: true })

  const globalsEntries = Object.entries(externalGlobals)

  const externalPackages = Object.keys(externalGlobals).flatMap(pkg => [pkg, `${pkg}/*`])

  // 一次性分配安全参数名（去重），banner 与 _requires 共用同一套
  const identOf = {}
  const usedIdents = new Set()
  for (const [pkg] of globalsEntries) {
    const base = toSafeIdent(pkg)
    let id = base
    let n = 2
    while (usedIdents.has(id)) id = `${base}${n++}`
    usedIdents.add(id)
    identOf[pkg] = id
  }

  const factoryParamsList = globalsEntries.map(([pkg]) => identOf[pkg]).join(', ')
  const requiresList = globalsEntries.map(([pkg]) => `require('${pkg}')`).join(', ')
  const amdList = globalsEntries.map(([pkg]) => `'${pkg}'`).join(', ')
  const browserList = globalsEntries.map(([_, g]) => `root.${g}`).join(', ')
  const internalRequires = globalsEntries.map(([pkg]) => `'${pkg}': ${identOf[pkg]}`).join(',\n    ')

  const bannerJs = `
(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(${requiresList});
  } else if (typeof define === 'function' && define.amd) {
    define([${amdList}], factory);
  } else {
    root = typeof globalThis !== 'undefined' ? globalThis : root || self;
    root.${exportModuleName} = factory(${browserList});
  }
})(this, function (${factoryParamsList}) {
  var _requires = {
    ${internalRequires}
  };
  var require = function(name) {
    if (_requires[name] !== undefined) return _requires[name];
    if (typeof window !== 'undefined' && window[name]) return window[name];
    if (typeof globalThis !== 'undefined' && globalThis[name]) return globalThis[name];
    return _requires[name];
  };

  var module = { exports: {} };
  var exports = module.exports;
`

  const footerJs = `
  return module.exports;
});
`

  const unMinPath = path.join(LIB_DIR, umdFile)
  const minPath = path.join(LIB_DIR, umdMinFile)

  const srcPlugins = doStripDefineWrapper ? [stripDefineVxeComponentPlugin] : []

  await esbuild.build({
    entryPoints: [entry],
    outfile: unMinPath,
    bundle: true,
    format: 'cjs',
    external: externalPackages,
    platform: 'browser',
    target: 'es2018',
    sourcemap: false,
    minify: false,
    logLevel: 'error',
    keepNames: false,
    charset: 'utf8',
    treeShaking: true,
    tsconfig: TSCONFIG,
    loader: { '.ts': 'ts', '.tsx': 'tsx' },
    define: DEFINE,
    plugins: [scssStubPlugin, ...srcPlugins],
    banner: { js: bannerJs },
    footer: { js: footerJs }
  })

  const unMinCode = await fsp.readFile(unMinPath, 'utf8')
  const { code: minCode } = await esbuild.transform(unMinCode, {
    loader: 'js',
    minify: true,
    target: 'es2018',
    charset: 'utf8'
  })
  await fsp.writeFile(minPath, minCode)
}

/* ------------------------------ 语言包编译 ------------------------------ */

async function buildLocales () {
  // 如果源码目录不存在，则跳过
  let stat
  try { stat = await fsp.stat(LOCALE_DIR_TMPL) } catch { return null }
  if (!stat.isDirectory()) return null

  const localePrefix = LOCALE_DIR_TMPL + path.sep
  const langFiles = FILES.filter(f => f.startsWith(localePrefix) && f.endsWith('.ts'))
  if (!langFiles.length) return null

  await fsp.mkdir(LOCALE_OUT_DIR, { recursive: true })

  // 判断目录 locale/lang 是否存在
  const oldLocaleOutDir = path.resolve(ROOT, 'lib/locale/lang')
  let hasOldLocaleOutDir = false
  try {
    const st = await fsp.stat(path.resolve(SRC_TMPL_DIR, 'locale/lang'))
    hasOldLocaleOutDir = st.isDirectory()
  } catch { }
  if (hasOldLocaleOutDir) {
    await fsp.mkdir(oldLocaleOutDir, { recursive: true })
  }

  const results = await Promise.all(langFiles.map(async file => {
    const fileName = path.basename(file, '.ts')
    // 全局变量名称，例如 VxeLanguageZhCN
    const globalVarName = `VxeLanguage${capitalize(XEUtils.camelCase(fileName))}`

    const banner = `(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root = typeof globalThis !== 'undefined' ? globalThis : root || self;
    root.${globalVarName} = factory();
  }
})(this, function () {
  var module = { exports: {} };
  var exports = module.exports;
`
    const footer = `
  return module.exports;
});`

    const tempOut = path.join(LOCALE_OUT_DIR, `.${fileName}.tmp`)
    try {
      await esbuild.build({
        entryPoints: [file],
        outfile: tempOut,
        packages: 'external',
        bundle: true,
        format: 'cjs',
        target: 'es2018',
        platform: 'neutral',
        charset: 'utf8',
        banner: { js: banner },
        footer: { js: footer }
      })

      const code = await fsp.readFile(tempOut, 'utf8')
      const { code: minCode } = await esbuild.transform(code, {
        loader: 'js',
        minify: true,
        target: 'es2018',
        charset: 'utf8'
      })

      const writes = [
        fsp.writeFile(path.join(LOCALE_OUT_DIR, `${fileName}.umd.js`), code),
        fsp.writeFile(path.join(LOCALE_OUT_DIR, `${fileName}.umd.min.js`), minCode)
      ]

      // 兼容旧版本
      if (hasOldLocaleOutDir) {
        writes.push(
          fsp.writeFile(path.join(oldLocaleOutDir, `${fileName}.umd.js`), code),
          fsp.writeFile(path.join(oldLocaleOutDir, `${fileName}.umd.min.js`), minCode)
        )
      }
      await Promise.all(writes)
    } finally {
      await fsp.unlink(tempOut).catch(() => { })
    }

    return `${fileName}.umd.js`
  }))

  return results
}

/* ------------------------------ 编译任务 ------------------------------ */

let FILES = []

function esbuildTranspile (format, outdir) {
  const srcPlugins = doStripDefineWrapper ? [stripDefineVxeComponentPlugin] : []
  return esbuild.build({
    entryPoints: FILES,
    outdir,
    outbase: SRC_TMPL_DIR,
    format,
    target: 'es2018',
    bundle: false,
    sourcemap: false,
    platform: 'neutral',
    logLevel: 'error',
    keepNames: false,
    charset: 'utf8',
    tsconfig: TSCONFIG,
    loader: { '.ts': 'ts', '.tsx': 'tsx' },
    define: DEFINE,
    plugins: srcPlugins
  })
}

function buildTypes () {
  const tmpConfig = path.join(ROOT, '.tsconfig.build-dts.json')
  const types = tsconfig.compilerOptions && tsconfig.compilerOptions.types
  const config = {
    extends: './tsconfig.json',
    compilerOptions: {
      rootDir: `./${SRC_TMPL}`,
      outDir: `./${OUT_ES}`,
      declaration: true,
      emitDeclarationOnly: true,
      noEmit: false,
      ...(types ? { types } : {})
    },
    include: [`./${SRC_TMPL}/**/*.ts`, `./${SRC_TMPL}/**/*.tsx`],
    exclude: ['node_modules', `./${SRC_TMPL}/**/*.test.ts`, `./${SRC_TMPL}/**/*.spec.ts`]
  }
  fs.writeFileSync(tmpConfig, JSON.stringify(config, null, 2))
  const tscBin = require.resolve('typescript/bin/tsc')
  return run(process.execPath, [tscBin, '-p', tmpConfig])
    .finally(() => { try { fs.unlinkSync(tmpConfig) } catch { } })
}

async function aliasEntry (dir, from, to) {
  try {
    await fsp.copyFile(path.join(dir, from), path.join(dir, to))
  } catch {
    console.warn(`[build] ⚠ 入口别名失败: ${rel(path.join(dir, from))} -> ${to}`)
  }
}

/* ------------------------------ main ------------------------------ */

async function main () {
  const t0 = Date.now()

  console.log(`[build] 源码 ${SRC} | CPU ${os.cpus().length} 核`)
  console.log(`[build] 组件 Define 包裹: ${doStripDefineWrapper ? '开启' : '关闭'}`)
  console.log(`[build] 编译输出 es=${OUT_ES}  lib=${OUT_LIB}  dist=${OUT_DIST}`)
  if (DO_LOCALE) {
    console.log(`[build] 语言包输出: ${localeOut}`)
  }
  console.log(`[build] UMD 编译: ${DO_UMD ? '开启' : '关闭'}`)
  console.log(`[build] 语言包编译: ${DO_LOCALE ? '开启' : '关闭'}`)
  console.log(`[build] 图标资源: ${DO_ICON ? '开启' : '关闭'}`)
  if (DO_ICON) {
    console.log(`[build] iconfont 版本号: ${buildTime}`)
  }

  const cleanJobs = DO_CLEAN
    ? [
        fsp.rm(ES_DIR, { recursive: true, force: true }),
        fsp.rm(LIB_DIR, { recursive: true, force: true }),
        fsp.rm(DIST_DIR, { recursive: true, force: true }),
        ...(DO_LOCALE ? [fsp.rm(LOCALE_OUT_DIR, { recursive: true, force: true })] : [])
      ]
    : []

  const [srcFiles] = await Promise.all([
    walk(SRC_DIR, f => /\.(ts|tsx)$/.test(f) && !f.endsWith('.d.ts')),
    copySrcToTmpl(),
    ...cleanJobs
  ])
  console.log(`[build] 资源文件 ${srcFiles.length} 个`)

  const aliasSources = await generateAliasSources()
  if (aliasSources.length) {
    console.log(`[build] 组件: ${aliasSources.length} 个`)
  }

  FILES = [
    ...srcFiles.map(f => path.join(SRC_TMPL_DIR, path.relative(SRC_DIR, f))),
    ...aliasSources.map(p => path.join(SRC_TMPL_DIR, p))
  ]

  try {
    if (!FILES.length) {
      throw new Error(`${rel(SRC_DIR)} 下未发现 .ts/.tsx`)
    }

    const mark = name => () => console.log(`[build] ✔ ${name.padEnd(20)} ${Date.now() - t0}ms`)

    const buildTasks = [
      esbuildTranspile('esm', ES_DIR).then(mark('es')),
      esbuildTranspile('cjs', LIB_DIR).then(mark('lib')),
      buildTypes().then(mark('types')),
      buildStyles().then(ns => {
        if (ns.length) console.log(`[build] ✔ ${'component style'.padEnd(20)} ${Date.now() - t0}ms  (${ns.length})`)
      }),
      buildBundle().then(() => {
        console.log(`[build] ✔ ${'esm'.padEnd(20)} ${Date.now() - t0}ms`)
      }),
      buildDistStyle().then(() => {
        console.log(`[build] ✔ ${'all style'.padEnd(20)} ${Date.now() - t0}ms`)
      })
    ]

    // 根据配置项动态决定是否加入 图标资源 构建任务
    if (DO_ICON) {
      buildTasks.push(
        copyIconAssets().then(() => {
          console.log(`[build] ✔ ${'icon'.padEnd(20)} ${Date.now() - t0}ms`)
        })
      )
    }

    // 根据配置项动态决定是否加入 UMD 构建任务
    if (DO_UMD) {
      buildTasks.push(
        buildUmdBundle().then(() => {
          console.log(`[build] ✔ ${'umd'.padEnd(20)} ${Date.now() - t0}ms`)
        })
      )
    }

    // 根据配置项动态决定是否加入 语言包 构建任务
    if (DO_LOCALE) {
      buildTasks.push(
        buildLocales().then(outs => {
          if (outs) console.log(`[build] ✔ ${'locale'.padEnd(20)} ${Date.now() - t0}ms  (${outs.length})`)
        })
      )
    }

    await Promise.all(buildTasks)

    await Promise.all([
      aliasEntry(ES_DIR, 'index.js', 'index.esm.js'),
      aliasEntry(LIB_DIR, 'index.js', 'index.common.js')
    ])

    console.log(`\n✅ done in ${Date.now() - t0}ms`)
  } finally {
    await fsp.rm(SRC_TMPL_DIR, { recursive: true, force: true }).catch(() => { })
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
