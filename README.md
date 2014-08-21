microscope-web
==============

microscope V1 web framework librairies.

Application
-----------

> microscope web application server.

sample:

```js
var Server = Application.extend({

    startHubs: true,

    initialize: function () {
        this.initAuthentication();
        this.initRouter();
        this.errorHandlers();
        this.run(this.log.bind(this));
    },

    middlewares: [
        flash(),
        commonsMidlw.locals
    ],

    errorHandlers: function () {
        this.app.use(commonsMidlw.NotFound);
        this.app.use(commonsMidlw.InternalServerError);
    },

    initAuthentication: function () {
        var AuthenticationProvider = new Authentication({app: this.app});
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

module.exports = Hub.extend({

    routes: {
        '/home' : 'home'
    },

    home: function (model) {
        console.log('message: ' + model);
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