// Imports
var HttpApplication = require('../../src/HttpApplication');
var HomeController = require('./controllers/HomeController');

var Application = HttpApplication.extend({
	
	initialize: function(){
		console.log("application booted");
	},
	
	controllers: [HomeController],
	middlewares: []
});

module.exports = Application;