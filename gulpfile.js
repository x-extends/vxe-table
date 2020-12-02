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
const merge = require('merge-stream')
const ts = require('gulp-typescript')

const time = Date.now()

const components = [
  'table',
  'column',
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

const styleCode = `require('./style.css')`

const commCode = `if (process.env.NODE_ENV === 'production') {
  module.exports = require('./index.common.pro.js')
} else {
  module.exports = require('./index.common.dev.js')
}
`

gulp.task('build_modules', () => {
  return gulp.src('packages/**/*.ts')
    .pipe(ts({
      strict: true,
      moduleResolution: 'node',
      noImplicitAny: true,
      target: 'esnext',
      lib: ['dom', 'esnext']
    }))
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
  languages.forEach(code => {
    fs.writeFileSync(`lib/locale/lang/${code}.d.ts`, `declare const langMsgs: { [key: string]: any }\nexport default langMsgs`)
  })
  const rest = languages.map(code => {
    const name = XEUtils.camelCase(code).replace(/^[a-z]/, firstChat => firstChat.toUpperCase())
    const isZHTC = ['zh-HK', 'zh-MO', 'zh-TW'].includes(code)
    return gulp.src(`packages/locale/lang/${isZHTC ? 'zh-TC' : code}.ts`)
      .pipe(ts({
        strict: true,
        moduleResolution: 'node',
        noImplicitAny: true,
        target: 'esnext',
        lib: ['dom', 'esnext']
      }))
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
  })
  return merge(...rest)
})

gulp.task('copy_ts', () => {
  return gulp.src('packages/**/*.d.ts')
    .pipe(gulp.dest('lib'))
})

gulp.task('build_lib', () => {
  fs.writeFileSync('lib/index.common.js', commCode)
  return merge(
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
  )
})

gulp.task('build_style', gulp.series('build_modules', 'build_i18n', 'copy_ts', () => {
  const rest = components.map(name => {
    return gulp.src(`styles/${name}.scss`)
      .pipe(replace(/(\/\*\*Variable\*\*\/)/, `@import './variable.scss';\n`))
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
      .pipe(gulp.dest(`lib/${name}/style`))
      .pipe(cleanCSS())
      .pipe(rename({
        basename: 'style',
        suffix: '.min',
        extname: '.css'
      }))
      .pipe(gulp.dest(`lib/${name}/style`))
  })
  return merge(...rest)
}))

gulp.task('build_clean', () => {
  return del('lib')
})

gulp.task('build', gulp.series('build_clean', 'build_style', 'build_lib', () => {
  components.forEach(name => {
    fs.writeFileSync(`lib/${name}/style/index.js`, styleCode)
  })
  return del([
    'lib_dev',
    'lib_pro'
  ])
}))

gulp.task('move_docs_static', () => {
  return gulp.src([
    'docs/static/**'
  ])
    .pipe(gulp.dest('docs/v4/static'))
})

gulp.task('move_docs_root', () => {
  return gulp.src([
    'docs/favicon.ico',
    'docs/index.html',
    'docs/logo.png'
  ])
    .pipe(gulp.dest('docs/v4'))
})

gulp.task('clear_docs_temp', () => {
  return del([
    'docs/static',
    'docs/favicon.ico',
    'docs/index.html',
    'docs/logo.png',
    '../branches/docs/vxe-table/docs'
  ], { force: true })
})

gulp.task('move_docs_latest', gulp.series('clear_docs_temp', () => {
  return gulp.src([
    'docs/v3/**'
  ])
    .pipe(gulp.dest('docs'))
}))

gulp.task('build_docs_v4', gulp.parallel('move_docs_static', 'move_docs_root'))

// gulp.task('build_html_docs', () => {
//   return gulp.src([
//     '../branches/docs/vxe-table/plugins/_index.html'
//   ])
//     .pipe(replace('href="./_index.css"', `href="./${time}.css"`))
//     .pipe(replace('src="./_index.js"', `src="./${time}.js"`))
//     .pipe(rename({
//       basename: 'index',
//       extname: '.html'
//     }))
//     .pipe(gulp.dest('../branches/docs/vxe-table/docs/plugins'))
//     .pipe(rename({
//       basename: '404',
//       extname: '.html'
//     }))
//     .pipe(gulp.dest('../branches/docs/vxe-table/docs/plugins'))
// })

// gulp.task('build_js_docs', () => {
//   return gulp.src([
//     '../branches/docs/vxe-table/plugins/_index.js'
//   ])
//     .pipe(rename({
//       basename: time,
//       extname: '.js'
//     }))
//     .pipe(gulp.dest('../branches/docs/vxe-table/docs/plugins'))
// })

// gulp.task('build_css_docs', () => {
//   return gulp.src([
//     '../branches/docs/vxe-table/plugins/_index.css'
//   ])
//     .pipe(prefixer({
//       borwsers: ['last 1 version', '> 1%', 'not ie <= 8'],
//       cascade: true,
//       remove: true
//     }))
//     .pipe(cleanCSS())
//     .pipe(rename({
//       basename: time,
//       extname: '.css'
//     }))
//     .pipe(gulp.dest('../branches/docs/vxe-table/docs/plugins'))
// })

// gulp.task('update_plugin_docs', gulp.series('build_html_docs', 'build_css_docs', 'build_css_docs', 'build_js_docs', () => {
//   return gulp.src([
//     '../branches/docs/vxe-table/plugins/**'
//   ]).pipe(gulp.dest('../branches/docs/vxe-table/docs/plugins'))
// }))
gulp.task('update_plugin_docs', () => {
  return gulp.src([
    '../branches/docs/vxe-table/plugins/**'
  ]).pipe(gulp.dest('../branches/docs/vxe-table/docs/plugins'))
})

gulp.task('copy_docs_v1', () => {
  return gulp.src('docs/v1/index.html')
    .pipe(rename({
      basename: '404'
    }))
    .pipe(gulp.dest('docs/v1'))
})

gulp.task('copy_docs_v2', () => {
  return gulp.src('docs/v2/index.html')
    .pipe(rename({
      basename: '404'
    }))
    .pipe(gulp.dest('docs/v2'))
})

gulp.task('copy_docs_v3', () => {
  return gulp.src('docs/v3/index.html')
    .pipe(rename({
      basename: '404'
    }))
    .pipe(gulp.dest('docs/v3'))
})

gulp.task('copy_docs_index', gulp.parallel('copy_docs_v1', 'copy_docs_v2', 'copy_docs_v3', () => {
  return gulp.src('docs/index.html')
    .pipe(rename({
      basename: '404'
    }))
    .pipe(gulp.dest('docs/v4'))
}))

gulp.task('update_docs', gulp.series('build_docs_v4', 'copy_docs_index', 'move_docs_latest', 'update_plugin_docs', () => {
  return gulp.src([
    'docs/**'
  ])
    .pipe(gulp.dest('../branches/docs/vxe-table/docs'))
}))
