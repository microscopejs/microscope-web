/**
* Imports.
*/
var fs             = require('fs');
var path           = require('path');
var http           = require('http');

var express        = require('express');
var favicon        = require('static-favicon');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

var _              = require('lodash');
var utils          = require('./utils');

/**
 * Application class.
 */
function Application (options) {
	options || (options = {});
	this.app = express();
	this._registerBaseConfigurations();
	this._registerBaseMiddlewares();
	this._registerMiddlewares();
	this._boot();
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

	_registerBaseConfigurations: function(){
		this.app.set('publicFolder', path.join(this.appRoot, this.folderConfigs.publicFolder));
		this.app.set('viewsFolder', path.join(this.appRoot, this.folderConfigs.viewsFolder));
		this.app.set('controllerFolder', path.join(this.appRoot, this.folderConfigs.controllerFolder));
		this.app.set('apiFolder', path.join(this.appRoot, this.folderConfigs.apiFolder));
		this.app.set('hubFolder', path.join(this.appRoot, this.folderConfigs.hubFolder));
	},

	_registerBaseMiddlewares: function () {
		this.app.use(favicon());
		this.app.use(logger('dev'));
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(cookieParser());
		this.app.use(methodOverride());
		this.app.use(express.static(path.join(this.appRoot, this.folderConfigs.publicFolder)));
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
		var self = this;
		var io = require('socket.io')(server);
		io.on('connection', function(socket){
			console.log('a user connected');
			self._loadModulesFromFolder(
				path.join(self.appRoot, self.folderConfigs.hubFolder), {io: io, socket: socket});
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
		var port = this.port || process.env.PORT;

		var server = this.app.listen(port, function() {
  			if(callback) callback();
		});

		if(this.startHubs){
			this._loadSocketServer(server);
		}
	}
});

Application.extend = utils.extend;

module.exports = Application;