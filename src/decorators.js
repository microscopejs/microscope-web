/**
 * filters decorators
 * target Controller class
 * @param  {array} arr
 * @return {function}
 */
function filters(arr) {
	return function (target, key, descriptor) {
		target.prototype.filters = arr;
	};
}

/**
 * routes decorators
 * target Controller class
 * @param  {object} actions
 * @return {function}
 */
function routes(actions) {
	return function (target, key, descriptor) {
		target.prototype.routes = actions;
	};
}

/**
 * controllers decorators
 * target HttpApplication class
 * @param  {array} arr
 * @return {function}
 */
function controllers(arr) {
	return function (target, key, descriptor) {
		target.prototype.controllers = arr;
	};
}

/**
 * middlewares decorators
 * target HttpApplication class
 * @param  {array} arr
 * @return {function}
 */
function middlewares(arr) {
	return function (target, key, descriptor) {
		target.prototype.middlewares = arr;
	};
}

/**
 * areas decorators
 * target HttpApplication class
 * @param  {object} obj
 * @return {function}
 */
function areas(obj) {
	return function (target, key, descriptor) {
		target.prototype.areas = obj;
	};
}

module.exports = { filters, routes, controllers, middlewares, areas };