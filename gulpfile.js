// Imports
var gulp   = require('gulp');
require('./tasks/docs');
require('./tasks/build');
require('./tasks/test');

// Tasks
gulp.task('default', ['test']);