microscope-web
==============

ES6, Express/Connect fully compatible, POO & Modular Web framework.

[![Build Status](https://travis-ci.org/microscopejs/microscope-web-es6.svg?branch=master)](https://travis-ci.org/microscopejs/microscope-web-es6)

![microscopejs](https://avatars3.githubusercontent.com/u/8160547?v=3&s=200)

Requirements
------------

* node
* npm
* gulp

Node.js installation
--------------------

#### Install on OSX

Using homebrew:

	brew install node

#### Install on Linux (Ubuntu/Mint)

	sudo apt-get install python-software-properties python g++ make
	sudo add-apt-repository ppa:chris-lea/node.js
	sudo apt-get update
	sudo apt-get install nodejs

#### Install on Windows

[Download Node.js MSI](http://nodejs.org/download/)

Installation
------------

#### install gulp (sudo on linux/OSX) :

	npm install gulp -g

#### install dependencies (sudo on linux/OSX) :

	npm install

Development commands
--------------------

#### test (run gulp test):

	npm test

#### build:

	gulp build

* compile src with babel to lib folder

#### test:

	gulp test
	
* validate source code (jsHint).

#### docs:

	gulp docs
	
* generate annoted code documentation (docco).
* generate annoted code samples documentation (docco).

How to use ?
============

Check out [project samples !!!](https://github.com/microscopejs/microscope-web/tree/master/samples)

Application class
-----------------

With ES5

```js

var HttpApplication = require('../../src/HttpApplication');
var HomeController = require('./controllers/HomeController');
var AuthApplication = require('../auth/AuthApplication');
var logger = require('./middlewares/commonMiddleware');

var Application = HttpApplication.extend({
	
	// register application controllers in array
	controllers: [HomeController],
	
	// register application middlewares in array
	// templateEngine, logging, authentication, ...
	// call middleware with express instance in parameter.
	// configure using app.use([middleware]);
	middlewares: [logger],
	
	// use AuthApplication class as sub application 
	// map to /auth/{controller}/{action}
	areas: {
		'/auth': AuthApplication
	}
});

module.exports = Application;

```

With ES6

```js

import {HttpApplication} from 'microscope-web';
import HomeController from './controllers/HomeController';
import AuthApplication from '../auth/AuthApplication';
import {logger} from './middlewares/commonMiddleware';

class Application extends HttpApplication {

	// register application controllers in array
	get controllers(){
		return [HomeController];
	}

	// register application middlewares in array
	// templateEngine, logging, authentication, ...
	// call middleware with express instance in parameter.
	// configure using app.use([middleware]);
	get middlewares(){
		return [logger];
	}

	// use AuthApplication class as sub application 
	// map to /auth/{controller}/{action}
	get areas(){
		return {'/auth': AuthApplication}
	}
}

var a = new Application();
a.run(() => console.log('application running'));

```

With experimental ES7

```js
import {HttpApplication, decorators} from 'microscope-web';
import AuthApplication from '../auth/AuthApplication';
import HomeController from './controllers/HomeController';
import {logger} from './middlewares/commonMiddleware';

var {controllers, middlewares, areas} = decorators;

@controllers([HomeController])
@middlewares([logger])
@areas({'/auth': AuthApplication})
class Application extends HttpApplication {
	
}

var a = new Application();
a.run(() => console.log('application running'));

```

Controller class
----------------

With ES5:

```js

var Controller = require('../../../src/Controller');
var filters = require('../filters/commonFilters');

var HomeController = Controller.extend({
	
	filters: [filters.controllerFilter],
	
	routes: function(){
		var self = this;
		return {
			'get /': [filters.actionFilter, self.index],
			'get /home/about': 'about'
		};
	},

	// index action
	// GET /
	index: function(request, response){
		response.send('index HomeController');
	},

	// about action
	// GET /home/about
	about: function(request, response){
		response.send('about HomeController');
	}
});

module.exports = HomeController;

```

With ES6:

```js

import {Controller} from 'microscope-web';
import {controllerFilter, actionFilter} from '../filters/commonFilters';

class HomeController extends Controller {

	// add some controllers filter
	get filters(){
		return [controllerFilter];
	}

	// configure controller routing with callback array
	get routes(){
		return {
			'get /': [actionFilter, this.index.bind(this)],
			'get /home/about': 'about'
		}
	}

	// index action
	// GET /
	index(request, response){
		response.send('index HomeController');
	}

	// about action
	// GET /home/about
	about(request, response){
		response.send('about HomeController');
	}
}

export default HomeController;

```

With experimental ES7

```js

import {Controller, decorators} from 'microscope-web';
import {controllerFilter, actionFilter} from '../filters/commonFilters';
var {filters, routes} = decorators;

@filters([controllerFilter])
@routes({
	'get /': {filters: [actionFilter], action: 'index'},
	'get /home/about': 'about'
})
class HomeController extends Controller {

	// index action
	// GET /
	index(request, response){
		response.send('index HomeController');
	}

	// about action
	// GET /home/about
	about(request, response){
		response.send('about HomeController');
	}
}

export default HomeController;

```


Roadmap
=======

* update NPM
* TypeScript support
* improve unit testing