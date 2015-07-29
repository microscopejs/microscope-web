// sample controller filter
exports.controllerFilter = function(req, res, next) {
	console.log('sample controller filter: ' + req.url);
	next();
};

// sample action filter
exports.actionFilter = function(req, res, next) {
	console.log('sample action filter');
	next();
};