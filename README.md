microscope-web
==============

microscope V1 web framework librairies.

Application
-----------

> microscope web application server.

sample:

```js
var Server = Application.extend({

    appRoot: __dirname,
    startHubs: true,

    initialize: function () {
        this.initAuthentication();
        this.initRouter();
        this.errorHandlers();
        this.run(this.log.bind(this));
    },

    // call configurations functions with app in param.
    configurations: [
        templateEngineProvider
    ],

    // call this.app.use(myMiddleware)
    middlewares: [
        flash(),
        commonsMidlw.locals
    ],

    initAuthentication: function () {
        var AuthenticationProvider = new Authentication({app: this.app});
    },

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
 * HomeController class.
 */
module.exports = BaseController.extend({

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

module.exports = HomeHub = Hub.extend({

    routes: {
        'log' : 'log',
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

AuthenticationProvider
----------------------

> Authentication providers configuration class

```js

// Imports
var localStrategy  = require('./strategies/localStrategy');
var googleStrategy = require('./strategies/googleStrategy');

// Authentication class
module.exports = AuthenticationProvider.extend({

    serialize: function(user, done) {
        done(null, user);
    },

    deserialize: function(obj, done) {
        done(null, obj);
    },

    strategies: [
        localStrategy,
        googleStrategy
    ]
});

```

TODO
----

* Migrate to express 4.
* Publish to NPM.