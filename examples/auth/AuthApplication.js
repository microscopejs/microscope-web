// Imports
var HttpApplication = require('../../libs/HttpApplication');
var logDate         = require('./middlewares/logDate').logDate;

/**
 * HttpApllication class example
 */
var OtherApplication = HttpApplication.extend({
	appRoot: __dirname,
	middlewares: [ logDate ],
});

module.exports = OtherApplication;