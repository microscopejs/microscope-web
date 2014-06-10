microscope-web
==============

microscope V1 web framework librairies.

Application
-----------

> microscope web application server.

sample:

```js
var Server = Application.extend({

	// default process.env.port || 3000
	port: 8080
	
	// start websockets hubs
	startHubs: true,
	
	// run server in initialize function
	initialize: function () {
		this.run(this.log.bind(this));
	},

	// register application middleware here.
	middlewares:[
		flash(),
		commonsMidlw.locals,
		securityMidlw.initialize,
		securityMidlw.session
	],

	log: function () {
		console.log('microscope application running at port ' + this.port);
	}
});

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

> Websocket controller.

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