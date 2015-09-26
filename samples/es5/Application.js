// Imports
var HttpApplication = require('../../src/HttpApplication');
var HomeController = require('./controllers/HomeController');

var Application = HttpApplication.extend({
	
	initialize: function(){},
	
	controllers: [HomeController],
	middlewares: []
});

module.exports = Application;