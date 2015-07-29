// Imports
var HttpApplication = require('../../src/HttpApplication');
var HomeController = require('./controllers/HomeController');

var Application = HttpApplication.extend({
	controllers: [HomeController],
	middlewares: []
});

var a = new Application();
a.run(function(){
	console.log('application running :' + this.port)
});

module.exports = Application;