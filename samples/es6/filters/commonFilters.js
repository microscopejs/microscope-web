// sample controller filter
export function controllerFilter(req, res, next) {
	console.log('sample controller filter: ' + req.url);
	next();
};

// sample action filter
export function actionFilter(req, res, next) {
	console.log('sample action filter');
	next();
};