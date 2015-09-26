// Import
var Controller = require('../../../src/Controller');
var filters = require('../filters/commonFilters');

var HomeController = Controller.extend({
	
	filters: [filters.controllerFilter],
	
	test: 'test',
	
	routes: {
		'get /': [filters.actionFilter, 'index'],
		'get /home/about': 'about'
	},
	
	initialize: function(){},

	// index action
	// GET /
	index: function(request, response){
		response.json({
			page: 'index HomeController',
			isControllerFilter: response.locals.isControllerFilter,
			isActionFilter: response.locals.isActionFilter || false
		});
	},

	// about action
	// GET /home/about
	about: function(request, response){
		response.json({
			page: 'about HomeController',
			isControllerFilter: response.locals.isControllerFilter,
			isActionFilter: response.locals.isActionFilter || false
		});
	}
});

module.exports = HomeController;