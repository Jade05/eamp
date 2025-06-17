var gulp = require('gulp')
var watch = require('gulp-watch')
var less = require('gulp-less')
var cleanCss = require('gulp-clean-css')

function images() {
  return gulp.src('./app/views/static/images/**')
    .pipe(gulp.dest('./dist/assets/images/'))
}

function fonts() {
  return gulp.src('./app/views/static/fonts/**')
    .pipe(gulp.dest('./dist/assets/fonts/'))
}

function lessTask() {
  return gulp.src('./app/views/static/style/*.less')
    .pipe(less())
    .pipe(cleanCss())
    .pipe(gulp.dest('./dist/assets/css/'))
}

function watchFiles() {
  return watch([
    './app/views/*.less',
    './app/views/**/*.less',
    './app/views/**/**/*.less',
    './app/views/**/**/**/*.less',
    './app/views/**/**/**/**/*.less'
  ], function () {
    gulp.series(lessTask)()
  })
}

exports.images = images
exports.fonts = fonts
exports.less = lessTask
exports.watch = watchFiles
exports.default = gulp.series(gulp.parallel(lessTask, images, fonts), watchFiles)