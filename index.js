/**
 * Imports
 */
var HttpApplication = require('./libs/HttpApplication');
var Controller      = require('./libs/Controller');

/**
 * Define microscopeWeb
 */
var microscopeWeb = {
	HttpApplication: HttpApplication,
	Controller: Controller
};

module.exports = microscopeWeb;