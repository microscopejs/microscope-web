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
 * Imports
 */
var Hub = require('microscope-web').Hub;

/**
 * Home hub
 * Simple chat hub with room.
 */
module.exports = HomeHub = Hub.extend({

    namespace: '/chat',
    rooms: [],

    routes: {
        'choose room' : 'chooseRoom',
        'message'     : 'message'
    },

    chooseRoom: function (data) {
        this.rooms.push(data.room);
        this.socket.room = data.room;
        this.socket.user = data.user;
        this.socket.join(data.room);
        this.socket.emit('join', this.socket.room);
    },

    message: function (msg) {
        this.io.of(this.namespace).to(this.socket.room).emit('message', {user: this.socket.user, msg: msg});
    }
});

```

TODO
----

* add function helpers to Hub class & Controller.