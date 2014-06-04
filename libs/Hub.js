// Imports
var _     = require('lodash');
var utils = require('./utils');

// WebSocket Hub Class
function Hub (options) {
	options || (options = {});
    if (options.app) this.io = options.io;
    if (options.socket) this.socket = options.socket;
    this._parseCommands();
    this.initialize.apply(this, arguments);
}

_.extend(Hub.prototype, {

	initialize: function(){},

	_parseCommands: function () {
		if(!this.commands) return;
		this.commands = _.result(this, 'commands');
		for (var i = 0; i < this.commands.length; i++) {
			this._parseCommand(this.commands[i]);
		};
	},

	_parseCommand: function (command) {
		if(!command.key) return;
		if(!command.action && !_.isFunction(this[command.action])) return;
		this.socket.on(command.key, this[command.action].bind(this));
	}
});

Hub.extend = utils.extend;

module.exports = Hub;