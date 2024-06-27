const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const XEUtils = require('xe-utils')
const del = require('del')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const dartSass = require('sass')
const gulpSass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const prefixer = require('gulp-autoprefixer')
const merge = require('merge-stream')
const pack = require('./package.json')
const ts = require('gulp-typescript')
const tsconfig = require('./tsconfig.json')

const sass = gulpSass(dartSass)

const tsSettings = {
  ...tsconfig.compilerOptions,
  target: 'es2016'
}

const exportModuleName = 'VXETable'
const esmOutDir = 'es'
const commOutDir = 'lib'

const coreName = 'ui'
const oldCoreName = 'v-x-e-table'

const componentList = [
  'table',
  'column',
  'colgroup',
  'toolbar',
  'grid'
]

const languages = [
  'zh-CN',
  'zh-TC',
  'zh-HK',
  'zh-MO',
  'zh-TW',
  'en-US',
  'ja-JP',
  'es-ES',
  'pt-BR'
]

const styleCode = 'require(\'./style.css\')'

const delDir = (directory) => {
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach(file => {
      const currentPath = path.join(directory, file)
      if (fs.lstatSync(currentPath).isDirectory()) {
        delDir(currentPath)
      } else {
        fs.unlinkSync(currentPath)
      }
    })
    fs.rmdirSync(directory)
  }
}

function toExportName (name) {
  const str = XEUtils.camelCase(name)
  return name === 'ui' ? 'UI' : `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`
}

gulp.task('build_escode', function () {
  [coreName, oldCoreName, ...componentList].forEach(name => {
    const exportName = `Vxe${toExportName(name)}`
    const esCode = `import ${exportName} from '../${name}'\nexport * from '../${name}'\nexport default ${exportName}`
    fs.mkdirSync(`packages_temp/vxe-${name}`)
    fs.writeFileSync(`packages_temp/vxe-${name}/index.ts`, esCode)
  })
  return gulp.src([
    'packages_temp/**.ts',
    'packages_temp/**/*.ts',
    '!packages_temp/index.ts'
  ])
    .pipe(replace('process.env.VUE_APP_VXE_VERSION', `"${pack.version}"`))
    .pipe(replace('process.env.VUE_APP_VXE_ENV', 'process.env.NODE_ENV'))
    .pipe(ts(tsSettings))
    .pipe(gulp.dest(esmOutDir))
})

gulp.task('build_esjs', gulp.series('build_escode', function () {
  return gulp.src([
    'packages_temp/index.ts'
  ])
    .pipe(replace('process.env.VUE_APP_VXE_VERSION', `"${pack.version}"`))
    .pipe(replace('process.env.VUE_APP_VXE_ENV', 'process.env.NODE_ENV'))
    .pipe(ts(tsSettings))
    .pipe(rename({
      basename: 'index',
      extname: '.esm.js'
    }))
    .pipe(gulp.dest(esmOutDir))
}))

gulp.task('build_es_all', gulp.series('build_esjs'))

gulp.task('build_commoncode', function () {
  return gulp.src([
    'packages_temp/**.ts',
    'packages_temp/**/*.ts',
    '!packages_temp/index.ts'
  ])
    .pipe(replace('process.env.VUE_APP_VXE_VERSION', `"${pack.version}"`))
    .pipe(replace('process.env.VUE_APP_VXE_ENV', 'process.env.NODE_ENV'))
    .pipe(ts(tsSettings))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest(commOutDir))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min',
      extname: '.js'
    }))
    .pipe(gulp.dest(commOutDir))
})

gulp.task('build_commonjs', gulp.series('build_commoncode', function () {
  return gulp.src([
    'packages_temp/index.ts'
  ])
    .pipe(replace('process.env.VUE_APP_VXE_VERSION', `"${pack.version}"`))
    .pipe(replace('process.env.VUE_APP_VXE_ENV', 'process.env.NODE_ENV'))
    .pipe(ts(tsSettings))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(rename({
      basename: 'index',
      extname: '.common.js'
    }))
    .pipe(gulp.dest(commOutDir))
}))

gulp.task('build_common_all', gulp.series('build_commonjs'))

// eslint-disable-next-line no-control-regex
const unicodeRE = /[^\x00-\xff]/g
const contentRE = /(?<!-)content\s*:\s*([^;}]+)/g

function toCSSUnicode (css) {
  return css.replace(contentRE, (u) => {
    return u.replace(unicodeRE, (m) => {
      return '\\' + m.charCodeAt(0).toString(16)
    })
  })
}

gulp.task('build_umdcss', () => {
  const styleStr = fs.readFileSync('lib_temp/index.css', 'utf-8')
  fs.writeFileSync('lib_temp/index.css', toCSSUnicode(styleStr))
  return gulp.src('lib_temp/index.css')
    .pipe(rename({
      basename: 'style'
    }))
    .pipe(gulp.dest('es'))
    .pipe(gulp.dest('lib'))
    .pipe(rename({
      suffix: '.min',
      extname: '.css'
    }))
    .pipe(gulp.dest('es'))
    .pipe(gulp.dest('lib'))
})

gulp.task('build_umdjs', () => {
  return gulp.src('lib_temp/index.umd.js')
    .pipe(gulp.dest('lib'))
    .pipe(uglify())
    .pipe(rename({
      basename: 'index',
      extname: '.umd.min.js'
    }))
    .pipe(gulp.dest('lib'))
})

gulp.task('build_umd_all', gulp.parallel('build_umdjs', 'build_umdcss'))

gulp.task('build_icon', () => {
  const timeNow = Date.now()
  return merge(
    gulp.src('lib/style.css')
      .pipe(replace(' format("woff2")', ` format("woff2"),url("./iconfont.${timeNow}.woff") format("woff"),url("./iconfont.${timeNow}.ttf") format("truetype")`))
      .pipe(gulp.dest('lib'))
      .pipe(gulp.dest('es')),
    gulp.src('styles/icon/*')
      .pipe(rename({
        suffix: `.${timeNow}`
      }))
      .pipe(gulp.dest('lib'))
      .pipe(gulp.dest('es'))
  )
})

function buildStyle (name, dirName) {
  return gulp.src(`styles/components/${name}.scss`)
    .pipe(sass())
    .pipe(prefixer({
      borwsers: ['last 1 version', '> 1%', 'not ie <= 8'],
      cascade: true,
      remove: true
    }))
    .pipe(rename({
      basename: 'style',
      extname: '.css'
    }))
    .pipe(gulp.dest(`es/${dirName}`))
    .pipe(gulp.dest(`lib/${dirName}/style`))
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'style',
      suffix: '.min',
      extname: '.css'
    }))
    .pipe(gulp.dest(`es/${dirName}`))
    .pipe(gulp.dest(`lib/${dirName}/style`))
}

gulp.task('build_single_style', () => {
  const rest = [];
  [coreName, oldCoreName, ...componentList].forEach(name => {
    rest.push(buildStyle(name, name))
    rest.push(buildStyle(name, `vxe-${name}`))
  })
  return merge(...rest)
})

gulp.task('build_i18n', () => {
  languages.forEach(code => {
    fs.writeFileSync(`lib/locale/lang/${code}.d.ts`, 'declare const langMsgs: { [key: string]: any }\nexport default langMsgs')
    fs.writeFileSync(`es/locale/lang/${code}.d.ts`, 'declare const langMsgs: { [key: string]: any }\nexport default langMsgs')
  })
  const rest = languages.map(code => {
    const name = XEUtils.camelCase(code).replace(/^[a-z]/, firstChat => firstChat.toUpperCase())
    const isZHTC = ['zh-HK', 'zh-MO', 'zh-TW'].includes(code)
    return gulp.src(`packages_temp/locale/lang/${isZHTC ? 'zh-TC' : code}.ts`)
      .pipe(ts(tsSettings))
      .pipe(babel({
        moduleId: `vxe-table-lang.${code}`,
        presets: ['@babel/env'],
        plugins: [
          ['@babel/transform-modules-umd', {
            globals: {
              [`vxe-table-language.${code}`]: `VXETableLang${name}`
            },
            exactGlobals: true
          }]
        ]
      }))
      .pipe(rename({
        basename: code,
        suffix: '.umd',
        extname: '.js'
      }))
      .pipe(gulp.dest('lib/locale/lang'))
      .pipe(uglify())
      .pipe(rename({
        basename: code,
        suffix: '.min',
        extname: '.js'
      }))
      .pipe(gulp.dest('lib/locale/lang'))
  })
  return merge(...rest)
})

gulp.task('copy_pack', () => {
  return gulp.src('packages/**')
    .pipe(gulp.dest('packages_temp'))
})

gulp.task('clear', () => {
  return del([
    commOutDir,
    esmOutDir,
    'packages_temp'
  ])
})

gulp.task('build_all', gulp.parallel('build_es_all', 'build_common_all', 'build_umd_all'))

gulp.task('build', gulp.series('clear', 'copy_pack', 'build_all', 'build_i18n', 'build_single_style', 'build_icon', () => {
  [coreName, oldCoreName, ...componentList].forEach(name => {
    fs.writeFileSync(`lib/${name}/style/index.js`, styleCode)
    fs.writeFileSync(`lib/vxe-${name}/style/index.js`, styleCode)
  })
  return del([
    'lib_temp',
    'packages_temp'
  ])
}))
