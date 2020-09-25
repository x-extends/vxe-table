const fs = require('fs')
const gulp = require('gulp')
const XEUtils = require('xe-utils')
const del = require('del')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const clean = require('gulp-clean')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const prefixer = require('gulp-autoprefixer')

const components = [
  'table',
  'column',
  'body',
  'toolbar',
  'grid',
  'pager',
  'checkbox',
  'radio',
  'input',
  'textarea',
  'button',
  'modal',
  'tooltip',
  'form',
  'select',
  'switch',
  'list',
  'pulldown',

  'icon',
  'cell',
  'header',
  'footer',
  'filter',
  'menu',
  'edit',
  'export',
  'keyboard',
  'validator',
  'v-x-e-table'
]

const languages = [
  'zh-CN',
  'zh-TC',
  'zh-HK',
  'zh-MO',
  'zh-TW',
  'en-US',
  'ja-JP'
]

const commCode = `if (process.env.NODE_ENV === 'production') {
  module.exports = require('./index.common.pro.js')
} else {
  module.exports = require('./index.common.dev.js')
}
`

gulp.task('build_modules', () => {
  return gulp.src('packages/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
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
  return Promise.all(languages.map(code => {
    const name = XEUtils.camelCase(code).replace(/^[a-z]/, firstChat => firstChat.toUpperCase())
    const isZHTC = ['zh-HK', 'zh-MO', 'zh-TW'].includes(code)
    return gulp.src(`packages/locale/lang/${isZHTC ? 'zh-TC' : code}.js`)
      .pipe(babel({
        moduleId: name,
        presets: ['@babel/env'],
        plugins: ['@babel/transform-modules-umd']
      }))
      .pipe(replace(`global.${name} = mod.exports;`, `global.VXETableLang${name} = mod.exports.default;`))
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
  }))
})

gulp.task('copy_ts', () => {
  return gulp.src('packages/**/*.d.ts')
    .pipe(gulp.dest('lib'))
})

gulp.task('build_lib', () => {
  fs.writeFileSync('lib/index.common.js', commCode)
  return Promise.all([
    gulp.src('lib_pro/index.common.js')
      .pipe(rename({
        basename: 'index',
        suffix: '.common.pro',
        extname: '.js'
      }))
      .pipe(gulp.dest('lib')),
    gulp.src('lib_dev/index.common.js')
      .pipe(rename({
        basename: 'index',
        suffix: '.common.dev',
        extname: '.js'
      }))
    .pipe(gulp.dest('lib')),
    gulp.src('lib_dev/index.umd.js')
      .pipe(gulp.dest('lib')),
    gulp.src('lib_pro/index.umd.min.js')
      .pipe(gulp.dest('lib')),
    gulp.src('lib_pro/index.css')
      .pipe(rename({
        basename: 'style',
        extname: '.css'
      }))
      .pipe(gulp.dest('lib'))
      .pipe(rename({
        basename: 'style',
        suffix: '.min',
        extname: '.css'
      }))
      .pipe(gulp.dest('lib'))
  ])
})

gulp.task('build_style', gulp.series('build_modules', 'build_i18n', 'copy_ts', () => {
  return Promise.all(components.map(name => {
    Promise.all([
      gulp.src('styles/index.js')
        .pipe(gulp.dest(`lib/${name}/style`)),
      gulp.src(`styles/${name}.scss`)
        .pipe(replace(/(\/\*\*Variable\*\*\/)/, `@import './variable.scss';\n`))
        .pipe(sass())
        .pipe(prefixer({
          borwsers: ['last 1 version', '> 1%', 'not ie <= 8'],
          cascade: true,
          remove: true
        }))
        .pipe(cleanCSS())
        .pipe(rename({
          basename: 'style',
          extname: '.css'
        }))
        .pipe(gulp.dest(`lib/${name}/style`))
    ])
  }))
}))

gulp.task('build_clean', () => {
  return del('lib')
})

gulp.task('build', gulp.series('build_clean', 'build_style', 'build_lib', () => {
  return del([
    'lib_dev',
    'lib_pro'
  ])
}))
