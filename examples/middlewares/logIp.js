exports.logIp = function logIp (app) {
	app.use(function (request, response, next) {
		console.log(request.ip);
		next();
	});
}