/**
* Imports.
*/
var fs      = require('fs');
var path    = require('path');
var http    = require('http');
var _       = require('lodash');
var express = require('express');
var engine  = require('ejs-locals');
var ejs     = require('ejs');
var utils   = require('./utils');

/**
 * Application class.
 */
function Application (options) {
	options || (options = {});
	this.app = express();
	this._registerBaseConfigurations();
	this._registerConfigurations();
	this._registerBaseMiddlewares();
	this._registerMiddlewares();
	this.initialize.apply(this, arguments);
}

_.extend(Application.prototype, {

	port: 3000,
	appRoot: null,
	startHubs: false,

	folderConfigs: {
		publicFolder: '/public/',
		viewsFolder: '/app/views/',
		controllerFolder: '/app/controllers/',
		apiFolder: '/app/api/',
		hubFolder: '/app/hubs/'
	},

	initialize: function () {},

	initRouter: function () {
		this.app.use(this.app.router);
	},

	_registerBaseConfigurations: function(){
		this.app.set('publicFolder', path.join(this.appRoot, this.folderConfigs.publicFolder));
		this.app.set('viewsFolder', path.join(this.appRoot, this.folderConfigs.viewsFolder));
		this.app.set('controllerFolder', path.join(this.appRoot, this.folderConfigs.controllerFolder));
		this.app.set('apiFolder', path.join(this.appRoot, this.folderConfigs.apiFolder));
		this.app.set('hubFolder', path.join(this.appRoot, this.folderConfigs.hubFolder));
	},

	_registerConfigurations: function () {
		if(!this.configurations) return;
		this.configurations = _.result(this, 'configurations');
		for (var i = 0; i < this.configurations.length; i++) {
			this.configurations[i](this.app);
		};
	},

	_registerBaseMiddlewares: function () {
		this.app.use(express.favicon());
		this.app.use(express.logger('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded());
		this.app.use(express.errorHandler());
	    this.app.use(express.cookieParser());
	    this.app.use(express.methodOverride());
		this.app.use(express.static(path.join(this.appRoot, this.folderConfigs.publicFolder)));
	    this.app.use(express.session({ secret: this.sessionSecret || 'microscopejs' }));
	},

	_registerMiddlewares: function () {
		if(!this.middlewares) return;
		this.middlewares = _.result(this, 'middlewares');
		for (var i = 0; i < this.middlewares.length; i++) {
			this.app.use(this.middlewares[i]);
		};
	},

	_loadModulesFromFolder: function (folderpath, options) {
		var self = this;
		fs.readdir(folderpath, function (err, files) {
			if (err) { 
				console.log(err);
				return;
			}
			files.forEach(function (file) {
				if (path.extname(file) === '.js') {
					var Module = require(folderpath + file);
					var m = new Module(options);
				}
			});
		});
	},

	// boot socket server
	_loadSocketServer: function (server) {
		var self = this;
		var io = require('socket.io')(server);
		io.on('connection', function(socket){
			console.log('a user connected');
			self._loadModulesFromFolder(path.join(self.appRoot, self.folderConfigs.hubFolder), {io: io, socket: socket});
			socket.on('disconnect', function(){
				console.log('user disconnected');
			});
		});
	},

	// boot controller & api
	_boot: function () {
		this._loadModulesFromFolder(path.join(this.appRoot, this.folderConfigs.apiFolder), {app: this.app});
		this._loadModulesFromFolder(path.join(this.appRoot, this.folderConfigs.controllerFolder), {app: this.app});
	},

	run: function (callback) {
		this._boot();
		var port = this.port || process.env.PORT;
		var server = http.createServer(this.app).listen(port, function () {
			if(callback) callback();
		});
		if(this.startHubs){
			this._loadSocketServer(server);
		}
		return server;
	}
});

Application.extend = utils.extend;

module.exports = Application;