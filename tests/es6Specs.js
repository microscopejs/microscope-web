require("babel/register");
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);
var Application = require('../samples/es6/Application');

var app;

describe('ES6 specs', function () {

	before(function (done) {
		var appl = new Application();
		app = appl.run(done);
	});

	after(function () {
		app.close();
	});

	it('URL / specs', function (done) {
		chai.request(app)
			.get('/')
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body.isControllerFilter).to.equal(true);
				expect(res.body.isActionFilter).to.equal(true);
				done();
			});
	});

	it('URL /home/about specs', function (done) {
		chai.request(app)
			.get('/home/about')
			.end(function (err, res) {
				expect(err).to.be.null;
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body.isControllerFilter).to.equal(true);
				expect(res.body.isActionFilter).to.equal(false);
				done();
			});
	});
});