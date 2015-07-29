// Imports
import HttpApplication from '../../src/HttpApplication';
import HomeController from './controllers/HomeController';

class Application extends HttpApplication {

	get controllers(){
		return [HomeController];
	}
}

export default Application;