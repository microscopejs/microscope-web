// Imports
var gulp   = require('gulp');
require('./tasks/docs');
require('./tasks/build');

// Tasks
gulp.task('default', ['test']);