var gulp = require('gulp')
var babel = require('gulp-babel')
// var uglify = require('gulp-uglify')
// var rename = require('gulp-rename')
// var umd = require('gulp-umd')

gulp.task('default', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      // presets: ['@babel/env']
      // presets: ['@babel/preset-env']
    }))
    // .pipe(uglify({
    //   output: {
    //     comments: 'some'
    //   }
    // }))
    // .pipe(rename({
    //   extname: '.common.js'
    // }))
    // .pipe(umd())
    .pipe(gulp.dest('lib2'))
})
