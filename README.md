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
var path                   = require('path');
var Application            = require('microscope-web').Application;
var flash                  = require('connect-flash');
var commonsMidlw           = require('./middlewares/commons');
var authenticationProvider = require('./middlewares/authenticationProvider');
var templateEngineProvider = require('./middlewares/templateEngineProvider');

/**
 * microscope application.
 */
var Server = Application.extend({

    appRoot: __dirname,
    startHubs: true,

    initialize: function () {
        this.initRouter();
        this.errorHandlers();
        this.run(this.log.bind(this));
    },

    configurations: [
        templateEngineProvider,
        authenticationProvider
    ],

    middlewares: [
        flash(),
        commonsMidlw.locals
    ],

    errorHandlers: function () {
        this.app.use(commonsMidlw.NotFound);
        this.app.use(commonsMidlw.InternalServerError);
    },

    log: function () {
        console.log('microscope application running at port ' + this.port);
    }
});

var server = new Server();

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
* Publish to NPM.