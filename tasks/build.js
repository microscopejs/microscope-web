// Imports
var gulp   = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('test', function() {
  	return gulp.src('./src/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter('jshint-stylish'));
});