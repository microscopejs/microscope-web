var express = require('express');
var _ = require('lodash');
var extend = require('./utils').extend;

// Controller class
// Constructor
// instantiate express router
function Controller() {
	this.router = express.Router();
	this._parseRoutes();
}

// controller url namespace
Controller.prototype.baseUrl = '/';

// parse controller routing & bind callback stack
Controller.prototype._parseRoutes = function(){
	var routeSplitter = /^(\S+)\s*(.*)$/;
	
	var routes = _.result(this, 'routes');

	for(var prop in routes) {
		var match = prop.match(routeSplitter);
		var verb = match[1];
		var routeUrl = match[2];
		var route = routes[prop];
		var stack;
		
		// TODO for each element in array => if string it is inner fn
		if(_.isArray(route)){
			stack = _.union(this.filters, route);
			this.router[verb](routeUrl, stack);
		}

		else if(_.isString(route)){
			stack = _.union(this.filters, [_.get(this, route).bind(this)]);
			this.router[verb](routeUrl, stack);
		}

		else if(_.isObject(route)){
			stack = _.union(this.filters, route.filters);
			stack.push(_.get(this, route.action).bind(this));
			this.router[verb](routeUrl, stack);
		}

		else{
			throw new Error('Invalid route definition');
		}
	}
};

// export configured express router
Controller.prototype.mount = function(){
	return this.router;
};

Controller.prototype.filters = [];
Controller.prototype.routes = {};
Controller.extend = extend;

module.exports = Controller;