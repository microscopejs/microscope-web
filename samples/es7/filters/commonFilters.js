// sample controller filter
export function controllerFilter(req, res, next) {
	res.locals.isControllerFilter = true;
	next();
};

// sample action filter
export function actionFilter(req, res, next) {
	res.locals.isActionFilter = true;
	next();
};