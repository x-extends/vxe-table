const fs = require('fs')
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

const sass = gulpSass(dartSass)

const coreName = 'v-x-e-table'

const moduleList = [
  'filter',
  'menu',
  'edit',
  'export',
  'keyboard',
  'validator'
]

const componentList = [
  'icon',
  'loading',
  'column',
  'colgroup',
  'toolbar',
  'grid',
  'pager',
  'checkbox',
  'checkbox-group',
  'radio',
  'radio-group',
  'radio-button',
  'input',
  'textarea',
  'button',
  'modal',
  'tooltip',
  'form',
  'form-item',
  'form-gather',
  'select',
  'optgroup',
  'option',
  'switch',
  'list',
  'pulldown',
  'table'
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

function toExportName (name) {
  const str = XEUtils.camelCase(name)
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`
}

gulp.task('build_modules', () => {
  moduleList.forEach(name => {
    const exportName = `VxeModule${toExportName(name)}`
    const esCode = `import ${exportName} from '../${name}'\nexport * from '../${name}'\nexport default ${exportName}`
    fs.mkdirSync(`packages_temp/vxe-module-${name}`)
    fs.writeFileSync(`packages_temp/vxe-module-${name}/index.ts`, esCode)
    fs.writeFileSync(`packages_temp/vxe-module-${name}/index.d.ts`, fs.readFileSync(`packages_temp/${name}/index.d.ts`, 'utf-8'))
  })
  componentList.forEach(name => {
    const exportName = `Vxe${toExportName(name)}`
    const esCode = `import ${exportName} from '../${name}'\nexport * from '../${name}'\nexport default ${exportName}`
    fs.mkdirSync(`packages_temp/vxe-${name}`)
    fs.writeFileSync(`packages_temp/vxe-${name}/index.ts`, esCode)
    fs.writeFileSync(`packages_temp/vxe-${name}/index.d.ts`, fs.readFileSync(`packages_temp/${name}/index.d.ts`, 'utf-8'))
  })

  return gulp.src('packages_temp/**/*.ts')
    .pipe(replace('process.env.VUE_APP_VXE_TABLE_VERSION', `"${pack.version}"`))
    .pipe(replace('process.env.VUE_APP_VXE_TABLE_ENV', 'process.env.NODE_ENV'))
    .pipe(ts({
      strict: true,
      moduleResolution: 'node',
      noImplicitAny: true,
      target: 'es5',
      module: 'esnext',
      lib: ['dom', 'esnext']
    }))
    .pipe(gulp.dest('es'))
    .pipe(babel({
      presets: [
        '@babel/env'
      ],
      plugins: []
    }))
    .pipe(gulp.dest('lib'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min',
      extname: '.js'
    }))
    .pipe(gulp.dest('lib'))
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
      .pipe(ts({
        strict: true,
        moduleResolution: 'node',
        noImplicitAny: true,
        target: 'esnext',
        lib: ['dom', 'esnext']
      }))
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

gulp.task('copy_ts', () => {
  return gulp.src('packages_temp/**/*.d.ts')
    .pipe(gulp.dest('es'))
    .pipe(gulp.dest('lib'))
})

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

gulp.task('build_lib', () => {
  const styleStr = fs.readFileSync('lib_temp/index.css', 'utf-8')
  fs.writeFileSync('lib_temp/index.css', toCSSUnicode(styleStr))
  return merge(
    gulp.src('es/index.common.js')
      .pipe(rename({
        basename: 'index',
        suffix: '.esm',
        extname: '.js'
      }))
      .pipe(gulp.dest('es')),
    gulp.src('lib_temp/index.umd.js')
      .pipe(gulp.dest('lib')),
    gulp.src('lib_temp/index.umd.min.js')
      .pipe(gulp.dest('lib')),
    gulp.src('lib_temp/index.css')
      .pipe(rename({
        basename: 'style',
        extname: '.css'
      }))
      .pipe(gulp.dest('es'))
      .pipe(gulp.dest('lib'))
      .pipe(rename({
        basename: 'style',
        suffix: '.min',
        extname: '.css'
      }))
      .pipe(gulp.dest('es'))
      .pipe(gulp.dest('lib'))
  )
})

gulp.task('build_icon', () => {
  const timeNow = Date.now()
  return merge(
    gulp.src('lib_temp/index.css')
      .pipe(replace(' format("woff2")', ` format("woff2"),url("./iconfont.${timeNow}.woff") format("woff"),url("./iconfont.${timeNow}.ttf") format("truetype")`))
      .pipe(gulp.dest('lib_temp')),
    gulp.src('lib/icon/style/style.css')
      .pipe(replace(' format("woff2")', ` format("woff2"),url("./iconfont.${timeNow}.woff") format("woff"),url("./iconfont.${timeNow}.ttf") format("truetype")`))
      .pipe(gulp.dest('lib/icon/style'))
      .pipe(gulp.dest('es/icon'))
      .pipe(rename({
        basename: 'style',
        suffix: '.min',
        extname: '.css'
      }))
      .pipe(gulp.dest('lib/icon/style')),
    gulp.src('styles/icon/*')
      .pipe(rename({
        suffix: `.${timeNow}`
      }))
      .pipe(gulp.dest('lib'))
      .pipe(gulp.dest('lib/icon/style'))
      .pipe(gulp.dest('es'))
      .pipe(gulp.dest('es/icon/style'))
  )
})

function buildStyle (name, dirName) {
  return gulp.src(`styles/${name}.scss`)
    .pipe(replace(/(\/\*\*Variable\*\*\/)/, '@import \'./variable.scss\';\n'))
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
    .pipe(rename({
      basename: 'style',
      extname: '.css'
    }))
    .pipe(gulp.dest(`lib/${dirName}/style`))
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'style',
      suffix: '.min',
      extname: '.css'
    }))
    .pipe(gulp.dest(`lib/${dirName}/style`))
}

gulp.task('build_style', () => {
  const rest = [coreName, ...moduleList, ...componentList].map(name => {
    return buildStyle(name, name)
  })
  moduleList.forEach(name => {
    rest.push(buildStyle(name, `vxe-module-${name}`))
  })
  componentList.forEach(name => {
    rest.push(buildStyle(name, `vxe-${name}`))
  })
  return merge(...rest)
})

gulp.task('build_clean', () => {
  return del(['lib', 'es'])
})

gulp.task('build', gulp.series('build_clean', 'copy_pack', 'build_modules', 'build_i18n', 'copy_ts', 'build_style', 'build_icon', 'build_lib', () => {
  [coreName].forEach(name => {
    fs.writeFileSync(`lib/${name}/style/index.js`, styleCode)
  })
  moduleList.forEach(name => {
    fs.writeFileSync(`lib/${name}/style/index.js`, styleCode)
  })
  componentList.forEach(name => {
    fs.writeFileSync(`lib/${name}/style/index.js`, styleCode)
  })
  return del([
    'lib_temp',
    'packages_temp',
    'lib/index.esm.js',
    'lib/index.esm.min.js',
    'es/index.common.js'
  ])
}))
