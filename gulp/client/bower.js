var gulp = require('gulp');
var wiredep = require('wiredep').stream;

/* This will add our bower dependencies to our index.html
 * so that we don't have to manually do it.
 */
gulp.task('bower', function () {
  return gulp.src('./client/index.html')
    .pipe(wiredep({
      directory: './client/bower_components'
    }))
    .pipe(gulp.dest('./dist/'));
});