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
var utils   = require('utils');

/**
 * Application class.
 */
function Application (options) {
	options || (options = {});
	this.app = express();
	this._setConfigurations();
	this._registerBaseMiddlewares();
	this._registerMiddlewares();
	this.initialize.apply(this, arguments);
	this.app.use(this.app.router);
}

_.extend(Application.prototype, {

	port: 3000,

	initialize: function () {},

	_setConfigurations: function () {
		this.app.set('views', path.join(__dirname, '/app/views'));
		if(this.ejsTags){
			this.app.locals.open = this.ejsTags.open;
			this.app.locals.close = this.ejsTags.close;
		}
		this.app.set('view engine', 'ejs');
		this.app.set('layout', 'layout');
		this.app.engine('ejs', engine);
    	this.app.locals({_layoutFile: true});
	},

	_registerBaseMiddlewares: function () {
		this.app.use(express.favicon());
		this.app.use(express.logger('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded());
		this.app.use(express.errorHandler());
	    this.app.use(express.cookieParser());
	    this.app.use(express.methodOverride());
		this.app.use(express.static(path.join(__dirname, this.publicFolder || 'public')));
	    this.app.use(express.session({ secret: this.sessionSecret || 'microscopejs' }));
	},

	_registerMiddlewares: function () {
		if(!this.middlewares) return;
		this.middlewares = _.result(this, 'middlewares');
		for (var i = 0; i < this.middlewares.length; i++) {
			this.app.use(this.middlewares[i]);
		};
	},

	_loadControllerFromFolder: function (folderpath) {
		var self = this;
		fs.readdir(folderpath, function (err, files) {
			if (err) { throw err; }
			files.forEach(function (file) {
				if (path.extname(file) === '.js') {
					var Controller = require(folderpath + file);
					var controller = new Controller({app: self.app});
				}
			});
		});
	},

	// boot controller & api
	_boot: function () {
		this._loadControllerFromFolder(__dirname + '/app/api/');
		this._loadControllerFromFolder(__dirname + '/app/controllers/');
	},

	run: function (callback) {
		this._boot();
		var port = this.port || process.env.PORT;
		return http.createServer(this.app).listen(port, function () {
			if(callback) callback();
		});
	}
});

Application.extend = utils.extend;

module.exports = Application;