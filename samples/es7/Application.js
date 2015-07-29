// Imports
import HttpApplication from '../../src/HttpApplication';
import decorators from '../../src/decorators';
import HomeController from './controllers/HomeController';
var {controllers, middlewares, areas} = decorators;

@controllers([HomeController])
class Application extends HttpApplication {

}

export default Application;