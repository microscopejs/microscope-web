// Import
import Controller from '../../../src/Controller';
import {controllerFilter, actionFilter} from '../filters/commonFilters';

class HomeController extends Controller {

	// add some controllers filter
	get filters(){
		return [controllerFilter];
	}

	// configure controller routing with callback array
	get routes(){
		return {
			'get /': [actionFilter, 'index'],
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