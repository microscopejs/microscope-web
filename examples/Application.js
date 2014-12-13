// Imports
var HttpApplication = require('../libs/HttpApplication');
var logIp           = require('./middlewares/logIp').logIp;

/**
 * HttpApllication class example
 */
var Application = HttpApplication.extend({
	port:3000,
	appRoot: __dirname,
	middlewares: [ logIp ],

	initialize: function () {}
});

module.exports = Application;