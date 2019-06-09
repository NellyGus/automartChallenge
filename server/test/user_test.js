import chai from 'chai';
import { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../server';

chai.use(chaiHttp);

describe('test signup endpoint', () => {
    it('should create a user', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            first_name: 'nelima',
            last_name: 'augustin',
            password: 'nelimaaugustin1234',
            address: '208, BKK, Bè-Klikame',
            email: 'baugustino12@gmail.com'
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equal(201);
            expect(res.body.newUser).to.be.an('object');
            expect(res.body.token).to.be.a('string');
            expect(res.body.newUser.id).to.be.an('number');
            expect(res.body.newUser.first_name).to.be.a('string');
            expect(res.body.newUser.last_name).to.be.a('string');
            expect(res.body.newUser.password).to.be.a('string');
            expect(res.body.newUser.address).to.be.a('string');
            expect(res.body.newUser.email).to.be.a('string');
            assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
            assert.strictEqual(res.body.status, 201, 'Status is not 201');
            assert.isObject(res.body, 'Response is not an object');
            assert.isObject(res.body.newUser, 'Data is not an object');
            assert.isString(res.body.token, 'Token is not a string');
            assert.isNumber(res.body.newUser.id, 'ID is not a number');
            assert.isString(res.body.newUser.first_name, 'Firstname is not a string');
            assert.isString(res.body.newUser.last_name, 'Lastname is not a string');
            assert.isString(res.body.newUser.password, 'Password is not a string');
            assert.isString(res.body.newUser.address, 'Adress is not a string');
            assert.isString(res.body.newUser.email, 'Email is not a string');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      it('Should return an error message if firstname is empty', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            first_name: '',
            last_name: 'augustin',
            password: 'nelimaaugustin1234',
            address: '208, BKK, Bè-Klikame',
            email: 'baugustino12@gmail.com'
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('firstname or lastname is required');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'firstname or lastname is required',
              'Expect error to be firstname or lastname is required');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      it('Should return an error message if firstname contain a number', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            first_name: 'nelima94',
            last_name: 'augustin',
            password: 'nelimaaugustin1234',
            address: '208, BKK, Bè-Klikame',
            email: 'baugustino12@gmail.com'
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('firstname or lastname cannot contain number');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'firstname or lastname cannot contain number',
              'Expect error to be firstname or lastname cannot contain number');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    
      it('Should return an error message if firstname is less than 3 characters', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            first_name: 'ne',
            last_name: 'augustin',
            password: 'nelimaaugustin1234',
            address: '208, BKK, Bè-Klikame',
            email: 'baugustino12@gmail.com'
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('firstname or lastname cannot be less than 3 characters');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'firstname or lastname cannot be less than 3 characters',
              'Expect error to be firstname or lastname cannot be less than 3 characters');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    
      it('Should return an error message if lastname is empty', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            first_name: 'nelima',
            last_name: '',
            password: 'nelimaaugustin1234',
            address: '208, BKK, Bè-Klikame',
            email: 'baugustino12@gmail.com'
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('firstname or lastname is required');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'firstname or lastname is required',
              'Expect error to be firstname or lastname is required');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    
      it('Should return an error message if lastname is less than 3 characters', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            first_name: 'nelima',
            last_name: 'au',
            password: 'nelimaaugustin1234',
            address: '208, BKK, Bè-Klikame',
            email: 'baugustino12@gmail.com'
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('firstname or lastname cannot be less than 3 characters');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'firstname or lastname cannot be less than 3 characters',
              'Expect error to be firstname or lastname cannot be less than 3 characters');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    
      it('Should return an error message if password is empty', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            first_name: 'nelima',
            last_name: 'augustin',
            password: '',
            address: '208, BKK, Bè-Klikame',
            email: 'baugustino12@gmail.com'
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('password is required');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'password is required',
              'Expect error to be password is required');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    
      it('Should return an error message if password is less than 6 characters', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            first_name: 'nelima',
            last_name: 'augustin',
            password: 'neli',
            address: '208, BKK, Bè-Klikame',
            email: 'baugustino12@gmail.com'
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.equal(400);
            expect(res.body.status).to.equals(400);
            expect(res.body.error).to.equals('password cannot be less than 6 characters');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'password cannot be less than 6 characters',
              'Expect error to be password cannot be less than 6 characters');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    
      it('Should return an error message if email is not valid', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            first_name: 'nelima',
            last_name: 'augustin',
            password: 'nelimaaugustin1234',
            address: '208, BKK, Bè-Klikame',
            email: 'baugustino12gmail.com'
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('provide a valid email address, please');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'provide a valid email address, please',
              'Expect error to be provide a valid email address, please');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
      it('Should return an error message if address is empty', (done) => {
        chai
          .request(app)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            first_name: 'nelima',
            last_name: 'augustin',
            password: 'nelimaaugustin1234',
            address: '',
            email: 'baugustino12@gmail.com'
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('address is required');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'address is required',
              'Expect error to be address is required');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    });
    
