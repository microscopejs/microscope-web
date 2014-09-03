/**
 * Imports
 */
var _       = require('lodash');
var utils   = require('./utils');

/**
 * Controller constructor
 * @param  {Object} options
 */
var Controller = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    if (options.app) {
        this.app = options.app;
    };
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
            this._parseRoute(key);
        }
    },

    _parseRoute: function (routeKey) {
        var delegateEventSplitter = /^(\S+)\s*(.*)$/;
        var match  = routeKey.match(delegateEventSplitter);
        var verb   = match[1],
            url    = match[2],
            value  = this.routes[routeKey];

        if(!_.contains(this.acceptVerb, verb)){ return; }

        var filters = [];
        var callback;
        var route = {
            ignoreBaseUrl: false
        };

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
                route.ignoreBaseUrl = value.ignoreBaseUrl;
            }
        }else{
            console.log('invalid routes values');
            return;
        }

        if(!callback){ return; }
        if(!url){ return; }
        if(!filters){ return; }
        if(!verb){ return; }

        route.verb = verb;
        route.url = url;
        route.filters = filters;
        route.callback = callback;

        this._bindRoute(route);
    },

    _bindRoute: function(route) {
        var filters = this.filters || [];
        var url = route.url;

        filters = _.union(filters, route.filters);
        if(this.baseUrl){ url = this.baseUrl + url; }

        if(route.ignoreBaseUrl){
            this.app[route.verb](route.url, filters, route.callback.bind(this));

            if(route.url === '/'){
                this.app[route.verb](url, filters, route.callback.bind(this));
            }
        }else{
            this.app[route.verb](url, filters, route.callback.bind(this));
        }
    },

    /**
     * parse controller filter.
     */
    _parseFilters: function() {
        if (!this.app) return;
        if (!this.filters) return;
        this.filters = _.result(this, 'filters') || [];
    }
});

Controller.extend = utils.extend;

module.exports = Controller;