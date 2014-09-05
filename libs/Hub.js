// Imports
var _     = require('lodash');
var utils = require('./utils');

// WebSocket Hub Class
function Hub (options) {
    var self = this;
    options || (options = {});
    if(options.io) this.io = options.io;
    if(!this.io){ return; }

    this.io.of(this.namespace).on('connection', this._connection.bind(this));
    this.initialize.apply(this, arguments);
}

_.extend(Hub.prototype, {

    namespace: '/',
    initialize: function(){},

    onConnection: function () {
        console.log('user connected to namespace :' + this.namespace);
    },

    onDisconnect: function () {
        console.log('user disconnected from namespace :' + this.namespace);
    },

    _connection: function (socket) {
        this.socket = socket;
        this.onConnection();
        this._parseRoutes();
        socket.on('disconnect', this.onDisconnect.bind(this));
    },

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