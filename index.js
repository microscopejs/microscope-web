/**
 * Imports
 */
var utils         = require('./libs/utils');
var Application   = require('./libs/Application');
var Controller    = require('./libs/Controller');
var ApiController = require('./libs/ApiController');

/**
 * Define microscopeWeb
 */
var microscopeWeb = {
	Application: Application,
	Controller: Controller,
	ApiController: ApiController
};

module.exports = microscopeWeb;