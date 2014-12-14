exports.logDate = function logDate (app) {
	app.use(function (request, response, next) {
		console.log(new Date().toString());
		next();
	});
}