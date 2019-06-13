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

(0, _mocha.describe)('test signup endpoint', function () {
  (0, _mocha.it)('should create a user', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/signup').set({
      'Content-type': 'application/json'
    }).send({
      first_name: 'nelima',
      last_name: 'augustin',
      password: 'nelimaaugustin1234',
      address: '208, BKK, Bè-Klikame',
      email: 'baugustino12@gmail.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res.statusCode).to.equal(201);
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equal(201);
      (0, _chai.expect)(res.body.newUser).to.be.an('object');
      (0, _chai.expect)(res.body.token).to.be.a('string');
      (0, _chai.expect)(res.body.newUser.id).to.be.an('number');
      (0, _chai.expect)(res.body.newUser.first_name).to.be.a('string');
      (0, _chai.expect)(res.body.newUser.last_name).to.be.a('string');
      (0, _chai.expect)(res.body.newUser.password).to.be.a('string');
      (0, _chai.expect)(res.body.newUser.address).to.be.a('string');
      (0, _chai.expect)(res.body.newUser.email).to.be.a('string');
      _chai.assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
      _chai.assert.strictEqual(res.body.status, 201, 'Status is not 201');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.isObject(res.body.newUser, 'Data is not an object');
      _chai.assert.isString(res.body.token, 'Token is not a string');
      _chai.assert.isNumber(res.body.newUser.id, 'ID is not a number');
      _chai.assert.isString(res.body.newUser.first_name, 'Firstname is not a string');
      _chai.assert.isString(res.body.newUser.last_name, 'Lastname is not a string');
      _chai.assert.isString(res.body.newUser.password, 'Password is not a string');
      _chai.assert.isString(res.body.newUser.address, 'Adress is not a string');
      _chai.assert.isString(res.body.newUser.email, 'Email is not a string');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  (0, _mocha.it)('Should return an error message if firstname is empty', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/signup').set({
      'Content-type': 'application/json'
    }).send({
      first_name: '',
      last_name: 'augustin',
      password: 'nelimaaugustin1234',
      address: '208, BKK, Bè-Klikame',
      email: 'baugustino12@gmail.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('firstname or lastname is required');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'firstname or lastname is required', 'Expect error to be firstname or lastname is required');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  (0, _mocha.it)('Should return an error message if firstname contain a number', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/signup').set({
      'Content-type': 'application/json'
    }).send({
      first_name: 'nelima94',
      last_name: 'augustin',
      password: 'nelimaaugustin1234',
      address: '208, BKK, Bè-Klikame',
      email: 'baugustino12@gmail.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('firstname or lastname cannot contain number');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'firstname or lastname cannot contain number', 'Expect error to be firstname or lastname cannot contain number');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  (0, _mocha.it)('Should return an error message if firstname is less than 3 characters', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/signup').set({
      'Content-type': 'application/json'
    }).send({
      first_name: 'ne',
      last_name: 'augustin',
      password: 'nelimaaugustin1234',
      address: '208, BKK, Bè-Klikame',
      email: 'baugustino12@gmail.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('firstname or lastname cannot be less than 3 characters');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'firstname or lastname cannot be less than 3 characters', 'Expect error to be firstname or lastname cannot be less than 3 characters');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  (0, _mocha.it)('Should return an error message if lastname is empty', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/signup').set({
      'Content-type': 'application/json'
    }).send({
      first_name: 'nelima',
      last_name: '',
      password: 'nelimaaugustin1234',
      address: '208, BKK, Bè-Klikame',
      email: 'baugustino12@gmail.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('firstname or lastname is required');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'firstname or lastname is required', 'Expect error to be firstname or lastname is required');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  (0, _mocha.it)('Should return an error message if lastname is less than 3 characters', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/signup').set({
      'Content-type': 'application/json'
    }).send({
      first_name: 'nelima',
      last_name: 'au',
      password: 'nelimaaugustin1234',
      address: '208, BKK, Bè-Klikame',
      email: 'baugustino12@gmail.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('firstname or lastname cannot be less than 3 characters');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'firstname or lastname cannot be less than 3 characters', 'Expect error to be firstname or lastname cannot be less than 3 characters');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  (0, _mocha.it)('Should return an error message if password is empty', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/signup').set({
      'Content-type': 'application/json'
    }).send({
      first_name: 'nelima',
      last_name: 'augustin',
      password: '',
      address: '208, BKK, Bè-Klikame',
      email: 'baugustino12@gmail.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('password is required');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'password is required', 'Expect error to be password is required');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  (0, _mocha.it)('Should return an error message if password is less than 6 characters', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/signup').set({
      'Content-type': 'application/json'
    }).send({
      first_name: 'nelima',
      last_name: 'augustin',
      password: 'neli',
      address: '208, BKK, Bè-Klikame',
      email: 'baugustino12@gmail.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.body.error).to.equals('password cannot be less than 6 characters');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'password cannot be less than 6 characters', 'Expect error to be password cannot be less than 6 characters');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });

  (0, _mocha.it)('Should return an error message if email is not valid', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/signup').set({
      'Content-type': 'application/json'
    }).send({
      first_name: 'nelima',
      last_name: 'augustin',
      password: 'nelimaaugustin1234',
      address: '208, BKK, Bè-Klikame',
      email: 'baugustino12gmail.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('provide a valid email address, please');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'provide a valid email address, please', 'Expect error to be provide a valid email address, please');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });
  (0, _mocha.it)('Should return an error message if address is empty', function (done) {
    _chai2.default.request(_server2.default).post('/api/v1/auth/signup').set({
      'Content-type': 'application/json'
    }).send({
      first_name: 'nelima',
      last_name: 'augustin',
      password: 'nelimaaugustin1234',
      address: '',
      email: 'baugustino12@gmail.com'
    }).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body.status).to.equals(400);
      (0, _chai.expect)(res.statusCode).to.equal(400);
      (0, _chai.expect)(res.body.error).to.equals('address is required');
      _chai.assert.isObject(res.body, 'Response is not an object');
      _chai.assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
      _chai.assert.strictEqual(res.body.status, 400, 'Status is not 400');
      _chai.assert.strictEqual(res.body.error, 'address is required', 'Expect error to be address is required');
      _chai.assert.isNull(err, 'Expect error to not exist');
      done();
    });
  });
});
//# sourceMappingURL=user_test.js.map