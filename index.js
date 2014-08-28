/**
 * Imports
 */
var Application            = require('./libs/Application');
var Controller             = require('./libs/Controller');
var Hub                    = require('./libs/Hub');

/**
 * Define microscopeWeb
 */
var microscopeWeb = {
	Application: Application,
	Controller: Controller,
	Hub: Hub
};

module.exports = microscopeWeb;