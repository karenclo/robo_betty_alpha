var gulp = require('gulp');

var connect = require('gulp-connect');

/* Serve our angular code. This will not use
 * Our actual backend. The serve will purely serve
 * the angular files.
 */
gulp.task('serve:frontend', ['build:dev'], function () {
  return connect.server({
    root: './dist/',
    port: 8080
  });
});

/* Watch Files For Changes */
gulp.task('frontend',['serve:frontend'], function() {
  gulp.watch('./client/bower_components', ['copy:bower-components', 'bower']);
  gulp.watch(['./client/index.html', './client/app/**/*'], ['concat', 'copy:views', 'bower']);
  gulp.watch('./client/assets/**', ['copy:assets']);
});
