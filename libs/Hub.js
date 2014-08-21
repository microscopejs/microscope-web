// Imports
var _     = require('lodash');
var utils = require('./utils');

// WebSocket Hub Class
function Hub (options) {
    options || (options = {});
    if (options.app) this.io = options.io;
    if (options.socket) this.socket = options.socket;
    this._parseRoutes();
    this.initialize.apply(this, arguments);
}

_.extend(Hub.prototype, {

    initialize: function(){},

    _parseRoutes: function () {
        if(!this.routes) return;
        this.routes = _.result(this, 'routes');

        for (var key in this.routes) {
            this._parseRoute(key);
        }
    },

    _parseRoute: function (key) {
        if(!_.isFunction(this[this.routes[key]])) return;
        this.socket.on(key, this[this.routes[key]].bind(this));
    }
});

Hub.extend = utils.extend;

module.exports = Hub;