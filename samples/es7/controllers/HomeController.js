// Import
import Controller from '../../../src/Controller';
import {controllerFilter, actionFilter} from '../filters/commonFilters';
import decorators from '../../../src/decorators';
var {filters, routes} = decorators;

@filters([controllerFilter])
@routes({
	'get /': [actionFilter, 'index'],
	'get /home/about': 'about'
})
class HomeController extends Controller {

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