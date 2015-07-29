var gulp  = require('gulp');
var docco = require("gulp-docco");

gulp.task('docs:code', function () {
	return gulp.src("./src/**/*.js")
	  .pipe(docco())
	  .pipe(gulp.dest('./docs/code'));
});

gulp.task('docs:sample', function () {
	return gulp.src("./samples/**/*.js")
	  .pipe(docco())
	  .pipe(gulp.dest('./docs/samples'));
});

gulp.task('docs', ['docs:code', 'docs:sample']);