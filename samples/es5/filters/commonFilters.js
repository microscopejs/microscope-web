// sample controller filter
exports.controllerFilter = function(req, res, next) {
	res.locals.isControllerFilter = true;
	next();
};

// sample action filter
exports.actionFilter = function(req, res, next) {
	res.locals.isActionFilter = true;
	next();
};