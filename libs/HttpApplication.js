/**
* Imports.
*/
var fs      = require('fs');
var path    = require('path');
var http    = require('http');
var express = require('express');
var _       = require('lodash');
var utils   = require('./utils');

/**
 * HttpApplication class.
 */
function HttpApplication (options) {
	options || (options = {});
	this.app = express();
	this._registerConfigurations();
	this._registerMiddlewares();
	this._boot();
	this._registerAreas();
	this.initialize.apply(this, arguments);
}

_.extend(HttpApplication.prototype, {

	appRoot: null,
	port: 3000,

	/**
	 * configurations object
	 * @type {Object}
	 */
	configurations: {
		env: 'dev'
	},

	areas: {},

	/**
	 * controllers root folders
	 * @type {Array}
	 */
	controllersRoot: [
		'/controllers/',
		'/api/'
	],

	initialize: function () {},

	/**
	 * register object configuration
	 */
	_registerConfigurations: function(){
		for(var key in this.configurations){
			this.app.set(key, this.configurations[key]);
		}
	},

	/**
	 * register middleware function with express app in params
	 */
	_registerMiddlewares: function () {
		if(!this.middlewares) return;
		this.middlewares = _.result(this, 'middlewares');
		for (var i = 0; i < this.middlewares.length; i++) {
			this.middlewares[i](this.app);
		};
	},

	_registerAreas: function () {
		for(var key in this.areas){
			this.app.use(key, this.areas[key]);
		}
	},

	/**
	 * instantiate class in folders
	 * @param  {string} folderpath
	 * @param  {object} options
	 */
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

	/**
	 * instantiate controllers class
	 */
	_boot: function () {
		for (var i = 0; i < this.controllersRoot.length; i++) {
			var ctrlPath = path.join(this.appRoot, this.controllersRoot[i]);
			this._loadModulesFromFolder(ctrlPath, {app: this.app});
		};
	},

	/**
	 * run http server
	 * @param  {Function} callback
	 * @return {http} http server
	 */
	run: function (callback) {
		var port = this.port || process.env.PORT;
		return this.app.listen(port, callback);
	},

	/**
	 * alias for run
	 * @param  {Function} callback
	 */
	createServer: function (callback) {
		this.run(callback);
	},

	/**
	 * return express application 
	 * @return {express}
	 */
	mount: function () {
		return this.app;
	}
});

HttpApplication.extend = utils.extend;

module.exports = HttpApplication;