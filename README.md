microscope-web
==============

microscope V1 web framework librairies.

Application
-----------

> microscope web application server.

sample:

```js

/**
 * Imports
 */
var Application            = require('microscope-web').Application;
var commonsMidlw           = require('./middlewares/commons');
var errorsMidlw            = require('./middlewares/errors');
var authenticationProvider = require('./middlewares/authenticationProvider');
var templateEngineProvider = require('./middlewares/templateEngineProvider');

/**
 * microscope application.
 */
var Server = Application.extend({

    appRoot: __dirname,
    startHubs: true,
    environment: 'dev', // this.app.set('env', 'dev');
    port: 5555,

    initialize: function () {
        this.errorHandlers();
        this.run(this.log.bind(this));
    },

    middlewares: [
        commonsMidlw.defaults,
        commonsMidlw.locals,
        templateEngineProvider,
        authenticationProvider
    ],

    errorHandlers: function () {
        errorsMidlw(this.app);
    },

    log: function () {
        console.log('microscope application running at port ' + this.port);
    }
});

module.exports = Server;

```


Controller
----------

> controller for http requests parsing and responses.

####sample:

```js

/**
 * Imports.
 */
var Controller = require('microscope-web').Controller;

/**
 * HomeController class.
 */
module.exports = Controller.extend({

    baseUrl: "/home",

    routes: {
        'get /' : {action: 'index', ignoreBaseUrl: true},
        'get /about' : 'about'
    },

    // index action.
    index: function(request, response) {
        response.render('home/index');
    },

    // about action.
    about: function (request, response) {
        request.flash('flash', 'test middlewares');
        response.render('home/about');
    }
});

```

Hub
---

> Websocket controllers.

####sample:

```js
/**
 * Imports.
 */
var Controller = require('microscope-web').Hub;

module.exports = HomeHub = Hub.extend({

    routes: {
        'log'       : 'log',
        'message'   : 'message'
    },

    // log in terminal message received.
    log: function (model) {
        console.log('log: ' + model);
        this.socket.emit('log', 'message received');
    },

    // broadcast message to everyone connected.
    message: function (model) {
        console.log('message for everyone: ' + model);
        this.io.sockets.emit('message', model);
    }
});

```

TODO
----

* Add room management in Hub class.
* Migrate to express 4.