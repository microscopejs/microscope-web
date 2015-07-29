/**
 * filters decorators
 * target Controller class
 * @param  {array} arr
 * @return {function}
 */
exports.filters = function (arr) {
	return function (target, key, descriptor) {
		target.prototype.filters = arr;
	};
};

/**
 * routes decorators
 * target Controller class
 * @param  {object} actions
 * @return {function}
 */
exports.routes = function (actions) {
	return function (target, key, descriptor) {
		target.prototype.routes = actions;
	};
};

/**
 * controllers decorators
 * target HttpApplication class
 * @param  {array} arr
 * @return {function}
 */
exports.controllers = function (arr) {
	return function (target, key, descriptor) {
		target.prototype.controllers = arr;
	};
};

/**
 * middlewares decorators
 * target HttpApplication class
 * @param  {array} arr
 * @return {function}
 */
exports.middlewares = function(arr) {
	return function (target, key, descriptor) {
		target.prototype.middlewares = arr;
	};
};

/**
 * areas decorators
 * target HttpApplication class
 * @param  {object} obj
 * @return {function}
 */
exports.areas = function(obj) {
	return function (target, key, descriptor) {
		target.prototype.areas = obj;
	};
};