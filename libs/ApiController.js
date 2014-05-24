/**
 * Imports
 */
var _     = require('lodash');
var utils = require('./utils');

/**
 * ApiController constructor
 * @param  {Object} options
 */
var ApiController = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    if (options.app) this.app = options.app;
    this._parseFilters();
    this._parseRoutes();
    this.initialize.apply(this, arguments);
}

/**
 * Override ApiController prototype
 */
_.extend(ApiController.prototype, {

    initialize: function() {},

    acceptVerb: ['get', 'post', 'put', 'delete', 'patch'],

    _parseRoutes: function() {
        if (!this.routes) return;
        if (!this.app) return;

        this.routes = _.result(this, 'routes');
        this.basePath = _.result(this, 'basePath');

        for (var i = 0; i < this.routes.length; i++) {
            this._bindRoute(this.routes[i]);
        };
    },

    _bindRoute: function(route) {
        if (!route.path && !route.action) return;
        var verb = route.verb || 'get';
        if (_.contains(this.acceptVerb, verb)) {
            if (_.has(this.app, verb) && _.isFunction(this[route.action])) {

                var ignoreBasePath = route.ignoreBasePath || false,
                    routePath = route.path,
                    filters = _.result(route, 'filters') || [];

                if (this.basePath && !ignoreBasePath) {
                    routePath = this.basePath === '/' ? route.path : this.basePath + (route.path === '/' ? '' : route.path);
                }

                // if path === '/' map route with basePath too
                if (this.basePath && route.path === '/') {
                    this.app[verb](this.basePath, filters, this[route.action]);
                }

                this.app[verb](routePath, filters, this[route.action]);
            } else {
                console.log(route.action + " is not a controller action (function)");
            }
        };
    },

    /**
     * parse controller filter and add to global controller route.
     */
    _parseFilters: function() {
        if (!this.app) return;
        if (!this.basePath) return;
        if (!this.filters) return;

        this.filters = _.result(this, 'filters') || [];
        this.app.all(this.basePath + '*', this.filters);
    }
});

ApiController.extend = utils.extend;

module.exports = ApiController;