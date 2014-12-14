// Imports
var Controller = require('../../../libs/Controller');

/**
 * LoginController
 */
var LoginController = Controller.extend({

	routes:{
		'get /' : 'login',
		'get /signin': 'signin'
	},

	login: function (request, response) {
		response.send('Want to logIn ?');
	},

	signin: function (request, response) {
		response.send('Want to signIn ?');
	}
});

module.exports = LoginController;