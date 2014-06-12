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
		this.run(this.log.bind(this));
	},

	middlewares:[
		flash(),
		commonsMidlw.locals
	],

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

module.exports = HomeController = Controller.extend({

    basePath: "/home",

    routes: [
        { path: '/', action: 'index', ignoreBasePath: true },
        { path: '/about', action: 'about'}
    ],

    // index action.
    index: function(request, response) {
        response.render('home/index', {'title': 'home controller ' + request.url});
    },

    // about action.
    about: function (request, response) {
        request.flash('flash', 'test middlewares');
        response.redirect('/');
    }
});

```

Hub
---

> Websocket controllers.

####sample:

```js

module.exports = Hub.extend({

	commands:[
		{key: '/home', action: 'home'}
	],

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
var AuthenticationProvider = require('./libs/AuthenticationProvider');
var localStrategy          = require('./strategies/localStrategy');
var googleStrategy         = require('./strategies/googleStrategy');

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