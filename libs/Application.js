/**
* Imports.
*/
var fs      = require('fs');
var path    = require('path');
var http    = require('http');
var express = require('express');
var IO      = require('socket.io')
var _       = require('lodash');
var utils   = require('./utils');

/**
 * Application class.
 */
function Application (options) {
	options || (options = {});
	this.app = express();
	this._registerConfigurations();
	this._registerMiddlewares();
	this._boot();
	this.initialize.apply(this, arguments);
}

_.extend(Application.prototype, {

	appRoot: null,
	port: 3000,
	startHubs: false,

	configurations: {
		env: 'dev'
	},

	controllersRoot: [
		'/app/controllers/',
		'/app/api/'
	],

	hubsRoot: [
		'/app/hubs/'
	],

	initialize: function () {},

	_registerConfigurations: function(){
		for(var key in this.configurations){
			this.app.set(key, this.configurations[key]);
		}
	},

	_registerMiddlewares: function () {
		if(!this.middlewares) return;
		this.middlewares = _.result(this, 'middlewares');
		for (var i = 0; i < this.middlewares.length; i++) {
			this.middlewares[i](this.app);
		};
	},

	_loadModulesFromFolder: function (folderpath, options) {
		var files = [];
		try{
			var files = fs.readdirSync(folderpath);
		}catch(e){
			return;
		}
		files.forEach(function (file) {
			if (path.extname(file) === '.js') {
				var Module = require(folderpath + file);
				var m = new Module(options);
			}
		});
	},

	// boot socket server
	_loadSocketServer: function (server) {
		var io = IO(server);

		for (var i = 0; i < this.hubsRoot.length; i++) {
			var ctrlPath = path.join(this.appRoot, this.hubsRoot[i]);
			this._loadModulesFromFolder(ctrlPath, {io: io});
		};
	},

	// boot controller & api
	_boot: function () {
		for (var i = 0; i < this.controllersRoot.length; i++) {
			var ctrlPath = path.join(this.appRoot, this.controllersRoot[i]);
			this._loadModulesFromFolder(ctrlPath, {app: this.app});
		};
	},

	run: function (callback) {
		var self = this;
		var port = this.port || process.env.PORT;

		var server = this.app.listen(port, function() {
			if(self.startHubs){
				self._loadSocketServer(server);
			}
  			if(callback) callback();
		});
	},

	mount: function () {
		return this.app;
	}
});

Application.extend = utils.extend;

module.exports = Application;