// Import
import Controller from '../../../src/Controller';
import {controllerFilter, actionFilter} from '../filters/commonFilters';
import decorators from '../../../src/decorators';
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