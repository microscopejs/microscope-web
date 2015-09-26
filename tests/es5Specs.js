var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);
var Application = require('../samples/es5/Application');

var app;

describe('ES5 specs', function () {

	before(function (done) {
		var appl = new Application()
		app = appl.run(done);
	});

	after(function () {
		app.close();
	});

	describe('URL / specs', function () {
		it('Should respond 200 status code', function (done) {
			chai.request(app)
				.get('/')
				.end(function (err, res) {
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					done();
				});
		});

		it('Should respond json', function (done) {
			chai.request(app)
				.get('/')
				.end(function (err, res) {
					expect(res).to.be.json;
					done();
				});
		});

		it('Should respond with controller & action filtered body', function (done) {
			chai.request(app)
				.get('/')
				.end(function (err, res) {
					expect(res.body.isControllerFilter).to.equal(true);
					expect(res.body.isActionFilter).to.equal(true);
					done();
				});
		});
	});

	describe('URL /home/about specs', function () {
		it('Should respond 200 status code', function (done) {
			chai.request(app)
				.get('/home/about')
				.end(function (err, res) {
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					done();
				});
		});

		it('Should respond json', function (done) {
			chai.request(app)
				.get('/home/about')
				.end(function (err, res) {
					expect(res).to.be.json;
					done();
				});
		});

		it('Should respond with controller filtered body', function (done) {
			chai.request(app)
				.get('/home/about')
				.end(function (err, res) {
					expect(res.body.isControllerFilter).to.equal(true);
					expect(res.body.isActionFilter).to.equal(false);
					done();
				});
		});
	});
});