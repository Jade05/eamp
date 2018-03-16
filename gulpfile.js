var gulp = require('gulp')
var watch = require('gulp-watch')
var less = require('gulp-less')
var minifyCss = require('gulp-minify-css')

gulp.task('images', function () {
  return gulp.src('./app/views/static/images/**')
    .pipe(gulp.dest('./dist/assets/images/'))
})

gulp.task('fonts', function () {
  return gulp.src('./app/views/static/fonts/**')
    .pipe(gulp.dest('./dist/assets/fonts/'))
})

gulp.task('less', function () {
  return gulp.src('./app/views/static/style/*.less')
    .pipe(less())
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/assets/css/'))
})

gulp.task('auto', function () {
  watch([
    './app/views/*.less',
    './app/views/**/*.less',
    './app/views/**/**/*.less',
    './app/views/**/**/**/*.less',
    './app/views/**/**/**/**/*.less'
  ], function () {
    gulp.start('less')
  })
})

gulp.task('default', ['less', 'images', 'fonts', 'auto'])
