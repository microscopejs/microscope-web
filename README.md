microscope-web
==============

microscope web framework class.

HttpApplication
---------------

> microscope web application server.

sample:

```js

// Imports
var HttpApplication  = require('../../libs/HttpApplication');
var AuthApplication  = require('../auth/AuthApplication');
var logIp            = require('./middlewares/logIp').logIp;

var authApplication = new AuthApplication();

/**
 * HttpApllication class example
 */
var Application = HttpApplication.extend({
    port:3000,
    appRoot: __dirname,

    areas: {
        '/auth': authApplication.mount()
    },

    middlewares: [ logIp ]
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

##### areas - object

    object definition for HttpApplication areas.
    key : baseRoute, value: other HttpApplication.mount()

##### controllersRoot - array

    folder paths for controller class files.

##### initialize - function

    initialize function called in constructor

##### _registerConfigurations - function

    private - set express app configurations

##### _registerAreas - function

    private - register other HttpApplication as area.

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