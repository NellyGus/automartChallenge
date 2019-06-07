import chai from 'chai';
import { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import server from '../server';

chai.use(chaiHttp);

describe('test signup endpoint', () => {
    it('should create a user', (done) => {
        chai
          .request(server)
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
            expect(res.body.newUser.token).to.be.a('string');
            expect(res.body.newUser.id).to.be.an('number');
            expect(res.body.newUser.first_name).to.be.a('string');
            expect(res.body.newUser.last_name).to.be.a('string');
            assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
            assert.strictEqual(res.body.status, 201, 'Status is not 201');
            assert.isObject(res.body, 'Response is not an object');
            assert.isObject(res.body.newUser, 'Data is not an object');
            assert.isString(res.body.newUser.token, 'Token is not a string');
            assert.isNumber(res.body.newUser.id, 'ID is not a number');
            assert.isString(res.body.newUser.first_name, 'Firstname is not a string');
            assert.isString(res.body.newUser.last_name, 'Lastname is not a string');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      it('Should return an error message if firstname is empty', (done) => {
        chai
          .request(server)
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
            expect(res.body.error).to.equals('Name fields cannot be empty');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'Name fields cannot be empty',
              'Expect error to be Name fields cannot be empty');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      it('Should return an error message if name contains a number', (done) => {
        chai
          .request(server)
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
            expect(res.body.error).to.equals('Name cannot contain number(s)');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'Name cannot contain number(s)',
              'Expect error to be Name cannot contain number(s)');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    
      it('Should return an error message if firstname is less than 2 characters', (done) => {
        chai
          .request(server)
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
            expect(res.body.error).to.equals('Name fields cannot be less than 2 characters');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'Name fields cannot be less than 2 characters',
              'Expect error to be Name fields cannot be less than 2 characters');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    
      it('Should return an error message if lastname is empty', (done) => {
        chai
          .request(server)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            first_name: 'nelima94',
            last_name: '',
            password: 'nelimaaugustin1234',
            address: '208, BKK, Bè-Klikame',
            email: 'baugustino12@gmail.com'
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('Name fields cannot be empty');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'Name fields cannot be empty',
              'Expect error to be Name fields cannot be empty');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    
      it('Should return an error message if lastname is less than 2 characters', (done) => {
        chai
          .request(server)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            first_name: 'nelima94',
            last_name: 'au',
            password: 'nelimaaugustin1234',
            address: '208, BKK, Bè-Klikame',
            email: 'baugustino12@gmail.com'
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('Name fields cannot be less than 2 characters');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'Name fields cannot be less than 2 characters',
              'Expect error to be Name fields cannot be less than 2 characters');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    
      it('Should return an error message if password is empty', (done) => {
        chai
          .request(server)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            first_name: 'nelima94',
            last_name: 'augustin',
            password: '',
            address: '208, BKK, Bè-Klikame',
            email: 'baugustino12@gmail.com'
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.body.status).to.equals(400);
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equals('Password field cannot be empty');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'Password field cannot be empty',
              'Expect error to be Password field cannot be empty');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    
      it('Should return an error message if password is less than 8 characters', (done) => {
        chai
          .request(server)
          .post('/api/v1/auth/signup')
          .set({
            'Content-type': 'application/json',
          })
          .send({
            first_name: 'nelima94',
            last_name: 'augustin',
            password: 'neli',
            address: '208, BKK, Bè-Klikame',
            email: 'baugustino12@gmail.com'
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.equal(400);
            expect(res.body.status).to.equals(400);
            expect(res.body.error).to.equals('Password cannot be less than 8 characters');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'Password cannot be less than 8 characters',
              'Expect error to be Password field cannot be empty');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    
      it('Should return an error message if email is not valid', (done) => {
        chai
          .request(server)
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
            expect(res.body.error).to.equals('Please provide a valid email address');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
            assert.strictEqual(res.body.status, 400, 'Status is not 400');
            assert.strictEqual(res.body.error,
              'Please provide a valid email address',
              'Expect error to be Please provide a valid email address');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    });
    
