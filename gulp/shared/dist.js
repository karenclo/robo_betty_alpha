var gulp = require('gulp');

/* This will create the dist folder
 * That is ready to serve by our backend
 */
gulp.task('dist', [
// 'lint:server',
// 'lint:client', uncomment this when ready to turn linting on
  'concat',
  'copy:bower-components',
  'bower',
  'copy:views',
  'copy:assets'
]);