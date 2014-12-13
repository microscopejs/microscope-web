// Imports
var Controller = require('../../libs/Controller');

/**
 * HomeController
 */
var HomeController = Controller.extend({

	routes:{
		'get /' : 'index',
		'get /about': 'about'
	},

	index: function (request, response) {
		response.send('welcome home microscope.js');
	},

	about: function (request, response) {
		response.send('about microscope.js');	
	}
});

module.exports = HomeController;