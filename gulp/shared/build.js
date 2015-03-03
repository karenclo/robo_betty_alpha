var uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    htmlify = require('gulp-angular-htmlify'),
    ngAnnotate = require('gulp-ng-annotate');

var gulp = require('gulp');

gulp.task('htmlify', ['copy:views'],function(){
  return gulp.src('./dist/**/*.html')
    .pipe(htmlify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('ng-annotate', ['dist'], function () {
  return gulp.src('dist/bundle.js')
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./dist/'));
});

/* Minify all css files */
gulp.task('minify:css', ['dist'], function() {
  return gulp.src('./dist/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./dist/css/'))
});

/* Minify bundle.js */
gulp.task('minify:js', ['ng-annotate'], function() {
  return gulp.src('./dist/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'))
});

/* Build the app without minification */
gulp.task('build:dev', ['dist']);

/* Build the app and minfy */
gulp.task('build:prod', ['minify:js', 'minify:css', 'htmlify']);
