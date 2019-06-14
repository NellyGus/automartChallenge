'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _mocha = require('mocha');

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

(0, _mocha.describe)('test car ad endpoint', function () {
  var carAd = void 0;
  before(function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/car').set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).send({
      state: 'use',
      status: 'available',
      price: 2500,
      manufacturer: 'Toyota',
      model: 'corolla',
      year: 2012
    }).end(function (err, res) {
      carAd = res.body.car;
      done();
    });
  });

  //create ad
  (0, _mocha.it)('should create an ad', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/car').set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).send({
      state: 'use',
      status: 'available',
      price: 2500,
      manufacturer: 'Toyota',
      model: 'corolla',
      year: 2012
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(201);
      (0, _chai.expect)(res.body.status).to.equal(201);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.car).to.be.an('object');
      (0, _chai.expect)(res.body.car.id).to.be.a('number');
      //expect(res.body.car.owner).to.be.a('number');
      (0, _chai.expect)(res.body.car.created_on).to.be.a('string');
      (0, _chai.expect)(res.body.car.state).to.be.a('string');
      (0, _chai.expect)(res.body.car.status).to.be.a('string');
      (0, _chai.expect)(res.body.car.price).to.be.a('number');
      (0, _chai.expect)(res.body.car.manufacturer).to.be.a('string');
      (0, _chai.expect)(res.body.car.model).to.be.a('string');
      (0, _chai.expect)(res.body.car.year).to.be.a('number');
      //expect(res.body.car.more_description).to.be.a('string');
      _chai.assert.strictEqual(res.statusCode, 201, 'status code is not 201');
      _chai.assert.strictEqual(res.status, 201, 'status is not 201');
      _chai.assert.isObject(res.body, 'response is not an object');
      _chai.assert.isObject(res.body.car, 'car is not an object');
      _chai.assert.isNumber(res.body.car.id, 'id is not a number');
      //assert.isNumber(res.body.owner, 'owner is not a number');
      _chai.assert.isString(res.body.car.created_on, 'date is not a string');
      _chai.assert.isString(res.body.car.state, 'state is not a string');
      _chai.assert.isString(res.body.car.status, 'status is not a string');
      _chai.assert.isNumber(res.body.car.price, 'price is not a number');
      _chai.assert.isString(res.body.car.manufacturer, 'manufacturer is not a string');
      _chai.assert.isString(res.body.car.model, 'model is not a string');
      _chai.assert.isNumber(res.body.car.year, 'year is not a number');
      //assert.isString(res.body.car.more_description, 'more description is not a string');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // request not authorized
  (0, _mocha.it)('Should return an error if request is not authorized', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/car').set({
      'Content-Type': 'application/json'
    }).send({
      state: 'use',
      status: 'available',
      price: '2500',
      manufacturer: 'Toyota',
      model: 'corolla',
      year: '2012'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(401);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(401);
      (0, _chai.expect)(res.body.error).to.equal('Authentication failed! Please Login again');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
      _chai.assert.strictEqual(res.body.status, 401, 'Status is not 401');
      _chai.assert.strictEqual(res.body.error, 'Authentication failed! Please Login again', 'Expect error to be Authentication failed! Please Login again');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // not valid token
  (0, _mocha.it)('Should return an error if token is not valid', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/car').set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOivIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXb20iLCJmaXJzdF9uYW1lIjoibmV2aWxsZSIsImxhc3RfbmFtZSI6IkF1Z3VzdGluIiwicGFzc3dvcmQiOiIkMmIkMDQkSzAvYWtHOGJOUnZ3cFJ3TU52cmJhLlpMM3RkZUdSVURDUTQ5dHpaT0tpdmUyQ21qWkcybG0iLCJhZGRyZXNzIjoiMjA4IFJ1ZSBCS0ssIELDqC1LbGlrYW1lIiwiaXNfYWRtaW4iOmZhbHNlfSwiaWF0IjoxNTYwMDk3NDMyLCJleHAiOjE1NjAxODM4MzJ9.u8IywIdkC6WWpOChA97vO94ix2prnkj3-VdpkB57CgI'
    }).send({
      state: 'use',
      status: 'available',
      price: '2500',
      manufacturer: 'Toyota',
      model: 'corolla',
      year: 2012
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(401);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(401);
      (0, _chai.expect)(res.body.error).to.equal('Authentication failed! Please Login again');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
      _chai.assert.strictEqual(res.body.status, 401, 'Status is not 401');
      _chai.assert.strictEqual(res.body.error, 'Authentication failed! Please Login again', 'Expect error to be Authentication failed! Please Login again');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // Manufacturer cannot contain number
  (0, _mocha.it)('Should return an error message if manufacturer field contains a number', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/car').set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).send({
      state: 'use',
      status: 'available',
      price: '2500',
      manufacturer: 'manufacturer2012',
      model: 'corolla',
      year: 2012
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('car manufacturer cannot contain number');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'car manufacturer cannot contain number', 'Expect error to be car manufacturer cannot contain number');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // model cannot be empty
  (0, _mocha.it)('Should return an error message if model field is empty', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/car').set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).send({
      state: 'use',
      status: 'available',
      price: '2500',
      manufacturer: 'BMW',
      model: '',
      year: 2012
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Car model is required');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'Car model is required', 'Expect error to be Car model is required');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // state cannot be empty
  (0, _mocha.it)('Should return an error message if car state field is empty', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/car').set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).send({
      state: '',
      status: 'available',
      price: '2500',
      manufacturer: 'BMW',
      model: '',
      year: 2012
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Car state is required');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'Car state is required', 'Expect error to be Car state is required');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // state cannot contain number
  (0, _mocha.it)('Should return an error message if car state contains number', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/car').set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).send({
      state: 'use70',
      status: 'available',
      price: '2500',
      manufacturer: 'BMW',
      model: 'model',
      year: 2012
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Car state cannot contain number');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'Car state cannot contain number', 'Expect error to be Car state cannot contain number');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // year cannot be empty
  (0, _mocha.it)('Should return an error message if year field is empty', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/car').set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).send({
      state: 'use',
      status: 'available',
      price: '2500',
      manufacturer: 'BMW',
      model: 'model',
      year: ''
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Enter a valid year, please');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'Enter a valid year, please', 'Expect error to be Enter a valid year, please');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // year not less or more than 4 digits
  (0, _mocha.it)('Should return an error message if year is less or more than 4 digits', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/car').set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).send({
      state: 'use',
      status: 'available',
      price: '2500',
      manufacturer: 'BMW',
      model: 'model',
      year: '410'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Enter a valid year, please');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'Enter a valid year, please', 'Expect error to be Enter a valid year, please');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // price should be a number
  (0, _mocha.it)('Should return an error message if price is not number', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/car').set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).send({
      state: 'use',
      status: 'available',
      price: 'price',
      manufacturer: 'BMW',
      model: 'model',
      year: 2012
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('price is invalid');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'price is invalid', 'Expect error to be price is invalid');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // status should not contain number
  (0, _mocha.it)('Should return an error message if status contains number', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/car').set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).send({
      state: 'use',
      status: 'available77',
      price: '2500',
      manufacturer: 'BMW',
      model: 'model',
      year: 2012
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('Status cannot contain number');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'Status cannot contain number', 'Expect error to be Status cannot contain number');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // status cannot be empty
  // it('Should return an error message if status field is empty', (done) => {
  //   chai
  //     .request(app)
  //     .post('/api/v1/car')
  //     .set({
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjoyLCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoibmV2aWxsZSIsImxhc3RfbmFtZSI6IkF1Z3VzdGluIiwicGFzc3dvcmQiOiIkMmIkMDQkSzAvYWtHOGJOUnZ3cFJ3TU52cmJhLlpMM3RkZUdSVURDUTQ5dHpaT0tpdmUyQ21qWkcybG0iLCJhZGRyZXNzIjoiMjA4IFJ1ZSBCS0ssIELDqC1LbGlrYW1lIiwiaXNfYWRtaW4iOmZhbHNlfSwiaWF0IjoxNTYwMDk3NDMyLCJleHAiOjE1NjAxODM4MzJ9.u8IywIdkC6WWpOChA97vO94ix2prnkj3-VeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8kdpkB57CgI',
  //     })
  //     .send({
  //       state: 'use' ,
  //       status: '',
  //       price: '2500',
  //       manufacturer: 'BMW',
  //       model: 'model',
  //       year: 2012
  //     })
  //     .end((err, res) => {
  //       expect(res.body).to.be.an('object');
  //       expect(res.body.status).to.equals(400);
  //       expect(res.statusCode).to.equal(400);
  //       expect(res.body.error).to.equals('Status is required');
  //       assert.isObject(res.body, 'Response is not an object');
  //       assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
  //       assert.strictEqual(res.body.status, 400, 'Status is not 400');
  //       assert.strictEqual(res.body.error,
  //         'Status is required', 'Expect error to be Status is required');
  //       assert.isNull(err, 'Expect error to not exist');
  //       done();
  //     });
  // });

  // view a specific car test
  (0, _mocha.it)('Should get a specific car', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/car/' + carAd.id).set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.car).to.be.an('object');
      (0, _chai.expect)(res.body.car.id).to.be.a('number');
      (0, _chai.expect)(res.body.car.created_on).to.be.a('string');
      (0, _chai.expect)(res.body.car.manufacturer).to.be.a('string');
      (0, _chai.expect)(res.body.car.model).to.be.a('string');
      (0, _chai.expect)(res.body.car.price).to.be.a('number');
      (0, _chai.expect)(res.body.car.status).to.be.a('string');
      (0, _chai.expect)(res.body.car.year).to.be.a('number');
      (0, _chai.expect)(res.body.car.state).to.be.a('string');
      _chai.assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
      _chai.assert.isObject(res.body, 'Data is not an object');
      _chai.assert.isObject(res.body.car, 'data is not an object');
      _chai.assert.isNumber(res.body.car.id, 'ID is not a number');
      _chai.assert.isString(res.body.car.created_on, 'Date is not a string');
      _chai.assert.isString(res.body.car.manufacturer, 'Manufacturer is not a string');
      _chai.assert.isString(res.body.car.model, 'Model is not a string');
      _chai.assert.isString(res.body.car.status, 'Status is not a string');
      _chai.assert.isNumber(res.body.car.price, 'Price is not a number');
      _chai.assert.isString(res.body.car.state, 'State is not a string');
      _chai.assert.isNumber(res.body.car.year, 'Year is not a number');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // All available cars between a price range
  (0, _mocha.it)('Should return all available cars between a price range', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/car?status=available&min_price=100000&max_price=150000').set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.be.an('array');
      _chai.assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.isArray(res.body.data, 'Data is not array');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // get all cars
  (0, _mocha.it)('Should return all cars ', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/cars').set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.cars).to.be.an('array');
      _chai.assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.isArray(res.body.cars, 'Data is not array');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });
  // available cars
  (0, _mocha.it)('Should return all available cars ', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/car?status=available').set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.be.an('array');
      _chai.assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.isArray(res.body.data, 'Data is not array');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // specific manufacturer available cars
  (0, _mocha.it)('Should return all available cars of a specific manufacturer', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/car?status=available&manufacturer=Toyota').set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.be.an('array');
      _chai.assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.isArray(res.body.data, 'Data is not array');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // available cars of specific state
  (0, _mocha.it)('Should return all available cars of a specific state', function (done) {
    _chai2.default.request(_server2.default).get('/api/v1/car?status=available&state=new').set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.data).to.be.an('array');
      _chai.assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.isArray(res.body.data, 'Data is not array');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // delete car ad test
  (0, _mocha.it)('Should delete an AD', function (done) {
    _chai2.default.request(_server2.default).delete('/api/v1/car/' + carAd.id).set({
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(200);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.message).to.be.equal('Car deleted successfully');
      (0, _chai.expect)(res.body.message).to.be.a('string');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
      _chai.assert.isString(res.body.message, 'Data is not a string');
      _chai.assert.strictEqual(res.body.message, 'Car deleted successfully', 'Data is not equal to Car deleted successfully');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  // update car price test
  //  it('Should update car AD price', (done) => {
  //   chai
  //     .request(app)
  //     .patch(`/api/v1/car/${carAd.id}/price`)
  //     .set({
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjoyLCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoibmV2aWxsZSIsImxhc3RfbmFtZSI6IkF1Z3VzdGluIiwicGFzc3dvcmQiOiIkMmIkMDQkU3kxbjM3RERIREZTdkRycERqNmczZThUVENocFlDOTNRbFc2Ylp2TGxxZFFVSW9RVDIzTXEiLCJhZGRyZXNzIjoiMjA4IFJ1ZSBCS0ssIELDqC1LbGlrYW1lIiwiaXNfYWRtaW4iOmZhbHNlfSwiaWF0IjoxNTYwMDc2NzAxLCJleHAiOjE1NjAwODAzMDF9.ddUzMskJPFICKdfrUuhZwHfMvVGlgud2M_TgrApbMnw',
  //     })
  //     .send({
  //       price: 8000
  //     })
  //     .end((err, res) => {
  //         expect(res.statusCode).to.equal(200);
  //         expect(res.body.status).to.equal(200);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body.car).to.be.an('object');
  //         expect(res.body.car.id).to.be.a('number');
  //         expect(res.body.car.created_on).to.be.a('string'); 
  //         expect(res.body.car.state).to.be.a('string');
  //         expect(res.body.car.status).to.be.a('string');
  //         expect(res.body.car.price).to.equal(8000);
  //         expect(res.body.car.manufacturer).to.be.a('string'); 
  //         expect(res.body.car.model).to.be.a('string');
  //         expect(res.body.car.year).to.be.a('number');
  //         assert.strictEqual(res.statusCode, 200, 'status code is not 201');
  //         assert.strictEqual(res.status, 200, 'status is not 201');
  //         assert.isObject(res.body, 'response is not an object');
  //         assert.isObject(res.body.car, 'car is not an object');
  //         assert.isNumber(res.body.car.id, 'id is not a number');
  //         assert.isString(res.body.car.created_on, 'date is not a string');
  //         assert.isString(res.body.car.state, 'state is not a string');
  //         assert.isString(res.body.car.status, 'status is not a string');
  //         assert.strictEqual(res.body.car.price, 8000, 'price is not equal 8000'); 
  //         assert.isString(res.body.car.manufacturer, 'manufacturer is not a string');
  //         assert.isString(res.body.car.model, 'model is not a string');
  //         assert.isNumber(res.body.car.year, 'year is not a number');
  //         assert.isNull(err, 'Expect error to not exist');
  //         done();
  //     });
  // });

  // it('Should update car AD status', (done) => {
  //   chai
  //     .request(app)
  //     .patch(`/api/v1/car/${carAd.id}/status`)
  //     .set({
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjoyLCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoibmV2aWxsZSIsImxhc3RfbmFtZSI6IkF1Z3VzdGluIiwicGFzc3dvcmQiOiIkMmIkMDQkU3kxbjM3RERIREZTdkRycERqNmczZThUVENocFlDOTNRbFc2Ylp2TGxxZFFVSW9RVDIzTXEiLCJhZGRyZXNzIjoiMjA4IFJ1ZSBCS0ssIELDqC1LbGlrYW1lIiwiaXNfYWRtaW4iOmZhbHNlfSwiaWF0IjoxNTYwMDc2NzAxLCJleHAiOjE1NjAwODAzMDF9.ddUzMskJPFICKdfrUuhZwHfMvVGlgud2M_TgrApbMnw',
  //     })
  //     .send({
  //       status: 'sold'
  //     })
  //     .end((err, res) => {
  //       expect(res.statusCode).to.equal(200);
  //       expect(res.body).to.be.an('object');
  //       expect(res.body.status).to.be.equal(200);
  //       expect(res.body.data.id).to.be.a('number');
  //       expect(res.body.data.created_on).to.be.a('string');
  //       expect(res.body.data.manufacturer).to.be.a('string');
  //       expect(res.body.data.model).to.be.a('string');
  //       expect(res.body.data.price).to.be.a('number');
  //       expect(res.body.data.state).to.be.a('string');
  //       expect(res.body.data.status).to.equal('sold');
  //       expect(res.body.data.year).to.be.a('number');
  //       assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
  //       assert.strictEqual(res.body.status, 200, 'Status is not 200');
  //       assert.isObject(res.body, 'Response is not an object');
  //       assert.isObject(res.body.data, 'Data is not an object');
  //       assert.isNumber(res.body.data.id, 'ID is not a number');
  //       assert.isString(res.body.data.created_on, 'Date is not a string');
  //       assert.isString(res.body.data.manufacturer, 'Manufacturer is not a string');
  //       assert.isString(res.body.data.model, 'Model is not a string');
  //       assert.strictEqual(res.body.data.status, 'sold', 'Status is not sold');
  //       assert.isNumber(res.body.data.price, 'Price is not a number');
  //       assert.isString(res.body.data.state, 'State is not a string');
  //       assert.isNumber(res.body.data.year, 'Year is not a number');
  //       assert.isNull(err, 'Expect error to not exist');
  //       done();
  //     });
  // });

});
//# sourceMappingURL=car_test.js.map