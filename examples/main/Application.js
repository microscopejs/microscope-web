// Imports
var HttpApplication  = require('../../libs/HttpApplication');
var AuthApplication  = require('../auth/AuthApplication');
var logIp            = require('./middlewares/logIp').logIp;

var authApplication = new AuthApplication();

/**
 * HttpApllication class example
 */
var Application = HttpApplication.extend({
	port:3000,
	appRoot: __dirname,

	initialize: function () {
		this.app.use('/auth', authApplication.mount());
	},

	middlewares: [ logIp ]
});

module.exports = Application;