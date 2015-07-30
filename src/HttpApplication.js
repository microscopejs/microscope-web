var express = require('express');
var _ = require('lodash');
var extend = require('./utils').extend;

// HttpApplication class
// Constructor
// instantiate express application
function HttpApplication() {
	this.app = express();
	this._registerConfigurations();
	this._registerMiddlewares();
	this._registerControllers();
	this._registerAreas();
	this.initialize.apply(this, arguments);
}

// http server port
HttpApplication.prototype.port = process.env.PORT || 3000;

HttpApplication.prototype.initialize = function(){};

// application configurations object
HttpApplication.prototype.configurations = {
	env: 'dev'
};

// instantiate, mount and register application controller
HttpApplication.prototype._registerControllers = function(){
	_.each(this.controllers, function(Controller){
		var c = new Controller(this.app);
		this.app.use(c.baseUrl, c.mount());
	}.bind(this));
};

// register application middlewares
HttpApplication.prototype._registerConfigurations = function(){
	_.each(this.configurations, function(config){
		this.app.set(config, this.configurations[config]);
	}.bind(this));
};

// register application middlewares
// call each middleware with express instance in param
HttpApplication.prototype._registerMiddlewares = function(){
	_.each(this.middlewares, function(middleware){
		middleware(this.app);
	}.bind(this));
};

// register application areas
// use other HttpApplication mounted instance as area
HttpApplication.prototype._registerAreas = function(){
	_.each(this.areas, function(area){
		var HttpApplication = this.areas[area];
		var h = new HttpApplication();
		this.app.use(area, h.mount());
	}.bind(this));
};

// run HttpApplication and callback
HttpApplication.prototype.run = function(callback){
	return this.app.listen(this.port, callback.bind(this));
};

// export configured express instance
HttpApplication.prototype.mount = function(){
	return this.app;
};

HttpApplication.prototype.controllers = [];
HttpApplication.prototype.middlewares = [];
HttpApplication.prototype.areas       = {};
HttpApplication.extend = extend;

module.exports = HttpApplication;