/**
 * Imports
 */
var Application            = require('./libs/Application');
var Controller             = require('./libs/Controller');
var Hub                    = require('./libs/Hub');
var AuthenticationProvider = require('./libs/AuthenticationProvider');

/**
 * Define microscopeWeb
 */
var microscopeWeb = {
	Application: Application,
	Controller: Controller,
	Hub: Hub,
	AuthenticationProvider: AuthenticationProvider
};

module.exports = microscopeWeb;