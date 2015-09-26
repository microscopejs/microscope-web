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
		response.json({
			page: 'index HomeController',
			isControllerFilter: response.locals.isControllerFilter,
			isActionFilter: response.locals.isActionFilter || false
		});
	}

	// about action
	// GET /home/about
	about(request, response){
		response.json({
			page: 'about HomeController',
			isControllerFilter: response.locals.isControllerFilter,
			isActionFilter: response.locals.isActionFilter || false
		});
	}
}

export default HomeController;