// Import
var Controller = require('../../../src/Controller');
var filters = require('../filters/commonFilters');

var HomeController = Controller.extend({
	
	filters: [filters.controllerFilter],
	
	routes: {
		'get /': [filters.actionFilter, 'index'],
		'get /home/about': 'about'
	},

	// index action
	// GET /
	index: function(request, response){
		response.send('index HomeController');
	},

	// about action
	// GET /home/about
	about: function(request, response){
		response.send('about HomeController');
	}
});

module.exports = HomeController;