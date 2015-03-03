var gulp = require('gulp');
var concat = require('gulp-concat');

/* This will create concatenate all our angular
 * code into one file the bundle.js and palce it
 * in the dist folder
 */
gulp.task('concat', function() {
  return gulp.src(['./client/app/app.module.js', './client/app/**/*.module.js', './client/app/**/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./dist/'));
});