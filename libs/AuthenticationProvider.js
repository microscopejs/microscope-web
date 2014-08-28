// Imports
var passport = require('passport');
var _        = require('lodash');
var utils    = require('./utils');

// AuthenticationProvider class
function AuthenticationProvider (options) {
	options || (options = {});
	if(options.app){
		this.app = options.app;
	}
	this._initSerializer();
	this._registerStrategies();
	this._initPassport();
	this.initialize.apply(this, arguments);
}

_.extend(AuthenticationProvider.prototype, {

	initialize: function () {},

	_initSerializer: function () {
		passport.serializeUser(this.serialize);
		passport.deserializeUser(this.deserialize);
	},

	_registerStrategies: function () {
		if(!this.strategies) return;
		this.strategies = _.result(this, 'strategies');
		for (var i = 0; i < this.strategies.length; i++) {
			this._registerStrategy(this.strategies[i]);
		};
	},

	_registerStrategy: function (strategy) {
		passport.use(strategy);
	},

	_initPassport: function () {
		this.app.use(passport.initialize());
		this.app.use(passport.session());
	}
});

AuthenticationProvider.extend = utils.extend;

module.exports = AuthenticationProvider;