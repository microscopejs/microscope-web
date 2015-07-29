// Imports
var HttpApplication = require('../../src/HttpApplication');
var HomeController = require('./controllers/HomeController');

var Application = HttpApplication.extend({
	controllers: [HomeController],
	middlewares: []
});

module.exports = Application;