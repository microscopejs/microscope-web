microscope-web
==============

microscope web framework class.

HttpApplication
---------------

> microscope web application server.

sample:

```js

// Imports
var HttpApplication = require('microscope-web').HttpApplication;
var logIp           = require('./middlewares/logIp').logIp;

/**
 * HttpApllication class example
 */
var Application = HttpApplication.extend({
    port:3000,
    appRoot: __dirname,
    middlewares: [ logIp ],

    initialize: function () {}
});

module.exports = Application;

```

#### HttpApplication API

##### appRoot (required) - string
    
    Directory name of application.

##### port - integer

    HTTP server port.

##### configurations - object

    set express app configuration : app.set(key, value);

##### controllersRoot - array

    folder paths for controller class files.

##### initialize - function

    initialize function called in constructor

##### _registerConfigurations - function

    private - set express app configurations

##### _loadModulesFromFolder - function

    private - instantiate class in folders

##### _boot - function

    private - instantiate controllers class

##### run - function

    run http server

##### createServer - function

    alias for run

##### mount - function

    return express application as middleware


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