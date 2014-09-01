/**
 * Imports
 */
var _     = require('lodash');
var utils = require('./utils');

/**
 * Controller constructor
 * @param  {Object} options
 */
var Controller = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    if (options.app) this.app = options.app;
    this._parseFilters();
    this._parseRoutes();
    this.initialize.apply(this, arguments);
}

/**
 * Override Controller prototype
 */
_.extend(Controller.prototype, {

    initialize: function() {},

    acceptVerb: ['get', 'post', 'put', 'delete', 'patch'],

    _parseRoutes: function() {
        if (!this.routes) return;
        if (!this.app) return;

        this.routes = _.result(this, 'routes');
        this.baseUrl = _.result(this, 'baseUrl');

        for (var key in this.routes) {
            this._bindRoute(key);
        }
    },

    _bindRoute: function(routeKey) {
        var delegateEventSplitter = /^(\S+)\s*(.*)$/;
        var match  = routeKey.match(delegateEventSplitter);
        var verb   = match[1],
            url    = match[2],
            value  = this.routes[routeKey];

        var filters = [];
        var callback;

        if(this.baseUrl){
            url = this.baseUrl + url;
        }

        if (_.contains(this.acceptVerb, verb)) {

            if(_.isFunction(value)){
                callback = value;
            }
            else if(_.isString(value)){
                if(_.isFunction(this[value])){
                    callback = this[value];
                }
            }
            else if(_.isObject(value)){
                filters = value.filters || [];
                if(_.isFunction(this[value.action])){
                    callback = this[value.action];
                }
                if(value.ignoreBaseUrl){
                    url = match[2];
                }
            }else{
                console.log('invalid routes values');
                return;
            }

            if(!callback){ return; }

            if (this.baseUrl && match[2] === '/') {
                this.app[verb](this.baseUrl, filters, callback.bind(this));
            }

            this.app[verb](url, filters, callback.bind(this));
        }
    },

    /**
     * parse controller filter and add to global controller route.
     */
    _parseFilters: function() {
        if (!this.app) return;
        if (!this.baseUrl) return;
        if (!this.filters) return;

        this.filters = _.result(this, 'filters') || [];
        this.app.all(this.baseUrl + '*', this.filters);
    }
});

Controller.extend = utils.extend;

module.exports = Controller;