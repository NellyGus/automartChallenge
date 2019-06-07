import chai from 'chai';
import { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../server';

chai.use(chaiHttp);

describe('Test post car ad endpoint', () => {
    let carAd;
    before((done) => {
      chai
        .request(app)
        .post('/api/v1/car')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .send({
          manufacturer: 'Range Rover',
          model: '5.0 SLC',
          price: '5000',
          state: 'new',
          year: '2015',
          status: 'available'
        })
        .end((err, res) => {
          carAd = res.body.car;
          done();
        });
    });
  
    it('Should create a car AD', (done) => {
      chai
        .request(app)
        .post('/api/v1/car')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .send({
            manufacturer: 'Range Rover',
            model: '5.0 SLC',
            price: '5000',
            state: 'new',
            year: '2015',
            status: 'available'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(201);
          expect(res.body.car).to.be.an('object');
          expect(res.body.car.id).to.be.a('number');
          expect(res.body.car.createdOn).to.be.a('string');
          expect(res.body.car.manufacturer).to.be.a('string');
          expect(res.body.car.model).to.be.a('string');
          expect(res.body.car.status).to.be.a('string');
          expect(res.body.car.price).to.be.a('number');
          expect(res.body.car.state).to.be.a('string');
          expect(res.body.car.year).to.be.a('number');
          assert.strictEqual(res.statusCode, 201, 'Status code is not 201');
          assert.strictEqual(res.body.status, 201, 'Status is not 201');
          assert.isObject(res.body, 'Response is not an object');
          assert.isObject(res.body.car, 'Data is not an object');
          assert.isString(res.body.car.manufacturer, 'Manufacturer is not a string');
          assert.isString(res.body.car.model, 'Model is not a string');
          assert.isString(res.body.car.status, 'Status is not a string');
          assert.isNumber(res.body.car.price, 'Price is not a number');
          assert.isString(res.body.car.state, 'State is not a string');
          assert.isNumber(res.body.car.year, 'Year is not a number');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return an error if request is not authorized', (done) => {
      chai
        .request(app)
        .post('/api/v1/car')
        .set({
          'Content-Type': 'application/json',
        })
        .send({
            manufacturer: 'Range Rover',
            model: '5.0 SLC',
            price: '5000',
            state: 'new',
            year: '2015',
            status: 'available'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(401);
          expect(res.body.error).to.equal('Authentication failed! Please Login again');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
          assert.strictEqual(res.body.status, 401, 'Status is not 401');
          assert.strictEqual(res.body.error,
            'Authentication failed! Please Login again',
            'Expect error to be Authentication failed! Please Login again');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return an error if token is not valid', (done) => {
      chai
        .request(app)
        .post('/api/v1/car')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRyMWN2ZFhDQ0s1bldaa2oycmQ0NlZlRUpTeEd6SmNOcG9CaWp5RXhYTFRGLm1oeC4uZXdIZSIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU4OTEyODA4LCJleHAiOjE1NTg5MjM2MDh9.ZS813EEUegCYU3suHV1NwunqEZ4RvRzaKyoJ96iwl6E',
        })
        .send({
            manufacturer: 'Range Rover',
            model: '5.0 SLC',
            price: '5000',
            state: 'new',
            year: '2015',
            status: 'available'
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(401);
          expect(res.body.error).to.equal('Authentication failed! Please Login again');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
          assert.strictEqual(res.body.status, 401, 'Status is not 401');
          assert.strictEqual(res.body.error,
            'Authentication failed! Please Login again',
            'Expect error to be Authentication failed! Please Login again');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return an error message if manufacturer field is empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/car')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .send({
            manufacturer: '',
            model: '5.0 SLC',
            price: '5000',
            state: 'new',
            year: '2015',
            status: 'available'
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equals(400);
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equals('Car manufacturer is required');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
          assert.strictEqual(res.body.status, 400, 'Status is not 400');
          assert.strictEqual(res.body.error,
            'Car manufacturer is required',
            'Expect error to be Car manufacturer is required');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return an error message if manufacturer field contains a number', (done) => {
      chai
        .request(app)
        .post('/api/v1/car')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .send({
            manufacturer: 'BMW54',
            model: '5.0 SLC',
            price: '5000',
            state: 'new',
            year: '2015',
            status: 'available'
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equals(400);
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equals('car manufacturer cannot contain number');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
          assert.strictEqual(res.body.status, 400, 'Status is not 400');
          assert.strictEqual(res.body.error,
            'car manufacturer cannot contain number',
            'car manufacturer cannot contain number');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return an error message if model is empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/car')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .send({
            manufacturer: 'BMW',
            model: '',
            price: '5000',
            state: 'new',
            year: '2015',
            status: 'available'
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equals(400);
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equals('Car model is required');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
          assert.strictEqual(res.body.status, 400, 'Status is not 400');
          assert.strictEqual(res.body.error,
            'Car model is required',
            'Expect error to be Car model is required');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return an error message if state is empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/car')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .send({
            manufacturer: 'BMW',
            model: '5.0 SLC',
            price: '5000',
            state: '',
            year: '2015',
            status: 'available'
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equals(400);
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equals('Car state is required');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
          assert.strictEqual(res.body.status, 400, 'Status is not 400');
          assert.strictEqual(res.body.error,
            'Car state is required',
            'Expect error to be Car state is required');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return an error message if car state contains a number', (done) => {
      chai
        .request(app)
        .post('/api/v1/car')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .send({
            manufacturer: 'BMW',
            model: '5.0 SLC',
            price: '5000',
            state: 'new2',
            year: '2015',
            status: 'available'
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equals(400);
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equals('Car state cannot contain number');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
          assert.strictEqual(res.body.status, 400, 'Status is not 400');
          assert.strictEqual(res.body.error,
            'Car state cannot contain number');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return an error message if year field is empty', (done) => {
      chai
        .request(app)
        .post('/api/v1/car')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .send({
            manufacturer: 'BMW',
            model: '5.0 SLC',
            price: '5000',
            state: 'new',
            year: '',
            status: 'available'
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equals(400);
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equals('Enter a valid year, please');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
          assert.strictEqual(res.body.status, 400, 'Status is not 400');
          assert.strictEqual(res.body.error, 'Enter a valid year, please');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return an error message if year is more or less than 4 digits', (done) => {
      chai
        .request(app)
        .post('/api/v1/car')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .send({
            manufacturer: 'BMW',
            model: '5.0 SLC',
            price: '5000',
            state: 'new',
            year: '876',
            status: 'available'
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equals(400);
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equals('Enter a valid year, please');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
          assert.strictEqual(res.body.status, 400, 'Status is not 400');
          assert.strictEqual(res.body.error,
            'Enter a valid year, please');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return an error message if price is not a number', (done) => {
      chai
        .request(app)
        .post('/api/v1/car')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .send({
            manufacturer: 'BMW',
            model: '5.0 SLC',
            price: 'price',
            state: 'new',
            year: '2012',
            status: 'available'
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equals(400);
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equals('price is invalid');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
          assert.strictEqual(res.body.status, 400, 'Status is not 400');
          assert.strictEqual(res.body.error, 'price is invalid');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should update car AD price', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/car/${carAd.id}/price`)
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .send({
          price: '6500',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.be.equal(200);
          expect(res.body.car).to.be.an('object');
          expect(res.body.car.id).to.be.a('number');
          expect(res.body.car.manufacturer).to.be.a('string');
          expect(res.body.car.model).to.be.a('string');
          expect(res.body.car.price).to.be.a('number');
          expect(res.body.car.state).to.be.a('string');
          expect(res.body.car.status).to.equal('available');
          expect(res.body.car.year).to.be.a('number');
          assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
          assert.strictEqual(res.body.status, 200, 'Status is not 200');
          assert.isObject(res.body, 'Response is not an object');
          assert.isObject(res.body.car, 'Data is not an object');
          assert.isNumber(res.body.car.id, 'ID is not a number');
          assert.isString(res.body.car.manufacturer, 'Manufacturer is not a string');
          assert.isString(res.body.car.model, 'Model is not a string');
          assert.strictEqual(res.body.car.status, 'available', 'Status is not available');
          assert.isNumber(res.body.car.price, 'Price is not a number');
          assert.isString(res.body.car.state, 'State is not a string');
          assert.isNumber(res.body.car.year, 'Year is not a number');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return an error message if price is not a number', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/car/${carAd.id}/price`)
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .send({
          price: 'price',
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equals(400);
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equals('price is invalid');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
          assert.strictEqual(res.body.status, 400, 'Status is not 400');
          assert.strictEqual(res.body.error,
            'price is invalid',
            'Expect error to be price is invalid');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return an error if request is not authorized', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/car/${carAd.id}/price`)
        .set({
          'Content-Type': 'application/json',
        })
        .send({
          price: '6500',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(401);
          expect(res.body.error).to.equal('Authentication failed! Please Login again');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
          assert.strictEqual(res.body.status, 401, 'Status is not 401');
          assert.strictEqual(res.body.error,
            'Authentication failed! Please Login again',
            'Expect error to be Authentication failed! Please Login again');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return an error if token is not valid', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/car/${carAd.id}/price`)
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer aeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .send({
          price: '6500',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(401);
          expect(res.body.error).to.equal('Authentication failed! Please Login again');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
          assert.strictEqual(res.body.status, 401, 'Status is not 401');
          assert.strictEqual(res.body.error,
            'Authentication failed! Please Login again',
            'Expect error to be Authentication failed! Please Login again');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should update car AD status', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/car/${carAd.id}/status`)
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .send({
          status: 'sold',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.be.equal(200);
          expect(res.body.car.id).to.be.a('number');
          expect(res.body.car.createdOn).to.be.a('string');
          expect(res.body.car.manufacturer).to.be.a('string');
          expect(res.body.car.model).to.be.a('string');
          expect(res.body.car.price).to.be.a('number');
          expect(res.body.car.state).to.be.a('string');
          expect(res.body.car.status).to.equal('sold');
          expect(res.body.car.year).to.be.a('number');
          assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
          assert.strictEqual(res.body.status, 200, 'Status is not 200');
          assert.isObject(res.body, 'Response is not an object');
          assert.isObject(res.body.car, 'Data is not an object');
          assert.isNumber(res.body.car.id, 'ID is not a number');
          assert.isString(res.body.car.createdOn, 'Date is not a string');
          assert.isString(res.body.car.manufacturer, 'Manufacturer is not a string');
          assert.isString(res.body.car.model, 'Model is not a string');
          assert.strictEqual(res.body.car.status, 'sold', 'Status is not sold');
          assert.isNumber(res.body.car.price, 'Price is not a number');
          assert.isString(res.body.car.state, 'State is not a string');
          assert.isNumber(res.body.car.year, 'Year is not a number');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return an error message if status is empty', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/car/${carAd.id}/status`)
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .send({
          status: '',
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equals(400);
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equals('Status is required');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
          assert.strictEqual(res.body.status, 400, 'Status is not 400');
          assert.strictEqual(res.body.error,
            'Status is required',
            'Expect error to be Status is required');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return an error message if status contains a number', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/car/${carAd.id}/status`)
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .send({
          status: 'Sold7',
        })
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equals(400);
          expect(res.statusCode).to.equal(400);
          expect(res.body.error).to.equals('Status cannot contain number');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 400, 'Status code is not 400');
          assert.strictEqual(res.body.status, 400, 'Status is not 400');
          assert.strictEqual(res.body.error,
            'Status cannot contain number',
            'Expect error to be Status cannot contain number');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return an error if request is not authorized', (done) => {
      chai
        .request(app)
        .patch(`/api/v1/car/${carAd.id}/status`)
        .set({
          'Content-Type': 'application/json',
        })
        .send({
          status: 'sold',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body).to.be.an('object');
          expect(res.body.status).to.equal(401);
          expect(res.body.error).to.equal('Authentication failed! Please Login again');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 401, 'Status code is not 401');
          assert.strictEqual(res.body.status, 401, 'Status is not 401');
          assert.strictEqual(res.body.error,
            'Authentication failed! Please Login again',
            'Expect error to be Authentication failed! Please Login again');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should get a specific car', (done) => {
      chai
        .request(app)
        .get(`/api/v1/car/${carAd.id}`)
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.id).to.be.a('number');
          expect(res.body.email).to.be.a('string');
          expect(res.body.createdOn).to.be.a('string');
          expect(res.body.manufacturer).to.be.a('string');
          expect(res.body.model).to.be.a('string');
          expect(res.body.price).to.be.a('number');
          expect(res.body.status).to.be.a('string');
          expect(res.body.year).to.be.a('number');
          expect(res.body.state).to.be.a('string');
          assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
          assert.isObject(res.body, 'Data is not an object');
          assert.isNumber(res.body.id, 'ID is not a number');
          assert.isString(res.body.email, 'Email is not a string');
          assert.isString(res.body.createdOn, 'Date is not a string');
          assert.isString(res.body.manufacturer, 'Manufacturer is not a string');
          assert.isString(res.body.model, 'Model is not a string');
          assert.isString(res.body.status, 'Status is not a string');
          assert.isNumber(res.body.price, 'Price is not a number');
          assert.isString(res.body.state, 'State is not a string');
          assert.isNumber(res.body.year, 'Year is not a number');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return all unsold cars between a price range', (done) => {
      chai
        .request(app)
        .get('/api/v1/car?status=available&min_price=100000&max_price=150000')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
          assert.isObject(res.body, 'Response is not an object');
          assert.isArray(res.body.data, 'Data is not array');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return all cars sold or available', (done) => {
      chai
        .request(app)
        .get('/api/v1/car')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
          assert.isObject(res.body, 'Response is not an object');
          assert.isArray(res.body.data, 'Data is not array');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return all unsold cars with status availbale', (done) => {
      chai
        .request(app)
        .get('/api/v1/car?status=available')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
          assert.isObject(res.body, 'Response is not an object');
          assert.isArray(res.body.data, 'Data is not array');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return a message if no AD with queried status is found', (done) => {
      chai
        .request(app)
        .get('/api/v1/car?status=unknown')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.equal('No record found');
          expect(res.body.data).to.be.a('string');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
          assert.isString(res.body.data, 'Data is not a string');
          assert.strictEqual(res.body.data,
            'No record found',
            'Data is not equal to No record found');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return a message if no AD with queried status and price is found', (done) => {
      chai
        .request(app)
        .get('/api/v1/car?status=unknown&min_price=unknown&max_price=unknown')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.equal('No record found');
          expect(res.body.data).to.be.a('string');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
          assert.isString(res.body.data, 'Data is not a string');
          assert.strictEqual(res.body.data,
            'No record found',
            'Data is not equal to No record found');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return all unsold cars of a specific manufacturer', (done) => {
      chai
        .request(app)
        .get('/api/v1/car?status=available&manufacturer=Toyota')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
          assert.isObject(res.body, 'Response is not an object');
          assert.isArray(res.body.data, 'Data is not array');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return a message if no AD with queried status and manufacturer is found', (done) => {
      chai
        .request(app)
        .get('/api/v1/car?status=unknown&manufacturer=unknown')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.equal('No record found');
          expect(res.body.data).to.be.a('string');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
          assert.isString(res.body.data, 'Data is not a string');
          assert.strictEqual(res.body.data,
            'No record found',
            'Data is not equal to No record found');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return all unsold cars of a specific state', (done) => {
      chai
        .request(app)
        .get('/api/v1/car?status=available&state=new')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
          assert.isObject(res.body, 'Response is not an object');
          assert.isArray(res.body.data, 'Data is not array');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return a message if no AD with queried status and state is found', (done) => {
      chai
        .request(app)
        .get('/api/v1/car?status=unknown&state=unknown')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.equal('No record found');
          expect(res.body.data).to.be.a('string');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
          assert.isString(res.body.data, 'Data is not a string');
          assert.strictEqual(res.body.data,
            'No record found',
            'Data is not equal to No record found');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return all unsold cars of a specific body type', (done) => {
      chai
        .request(app)
        .get('/api/v1/car?status=available&bodyType=Saloon')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.an('array');
          assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
          assert.isObject(res.body, 'Response is not an object');
          assert.isArray(res.body.data, 'Data is not array');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return a message if no AD with queried status and body type is found', (done) => {
      chai
        .request(app)
        .get('/api/v1/car?status=unknown&bodyType=unknown')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCQvdjBxTnFUZGxFVjZEYldITjZqLjV1MU94NWg3ZWpyaGlSVml1YVNlbWlxTExqOWtoQXRmLiIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlfSwiaWF0IjoxNTU5MTM4NTY1LCJleHAiOjE1NTkzMTEzNjV9.1chjN5nlluRATgWMdP7CHhcqB3JhUasFPdaSGjXx4Z0',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.equal('No record found');
          expect(res.body.data).to.be.a('string');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
          assert.isString(res.body.data, 'Data is not a string');
          assert.strictEqual(res.body.data,
            'No record found',
            'Data is not equal to No record found');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should delete an AD if user is an admin', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/car/${carAd.id}`)
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRaNk82MVkvS2VkZlRKQ2JJNFNDTEFlbzB5LzdmTFBqZlJDMFA4L0NYY2hnVldONkJYbi5CSyIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWV9LCJpYXQiOjE1NTkxMzk4NDAsImV4cCI6MTU1OTMxMjY0MH0.O2QKtfG9xqM37sCWlic2ySJeWEA9e6KTbd5zagRraKY',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.equal('Car Ad successfully deleted');
          expect(res.body.data).to.be.a('string');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
          assert.isString(res.body.data, 'Data is not a string');
          assert.strictEqual(res.body.data,
            'Car Ad successfully deleted',
            'Data is not equal to Car Ad successfully deleted');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
    it('Should return a message if record is not found', (done) => {
      chai
        .request(app)
        .delete('/api/v1/car/11111045')
        .set({
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMDAwLCJmaXJzdG5hbWUiOiJQYXVsIiwibGFzdG5hbWUiOiJPYm9kb2t1bmEiLCJlbmNyeXB0ZWRQYXNzd29yZCI6IiQyYSQxMCRaNk82MVkvS2VkZlRKQ2JJNFNDTEFlbzB5LzdmTFBqZlJDMFA4L0NYY2hnVldONkJYbi5CSyIsImFkZHJlc3MiOiIxMywgcWVlcnJma2Yga2ZrbWZrbSBrZm1rZm1ra21mbWtmIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWV9LCJpYXQiOjE1NTkxMzk4NDAsImV4cCI6MTU1OTMxMjY0MH0.O2QKtfG9xqM37sCWlic2ySJeWEA9e6KTbd5zagRraKY',
        })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body.data).to.be.equal('No record found');
          expect(res.body.data).to.be.a('string');
          assert.isObject(res.body, 'Response is not an object');
          assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
          assert.isString(res.body.data, 'Data is not a string');
          assert.strictEqual(res.body.data,
            'No record found',
            'Data is not equal to No record found');
          assert.isNull(err, 'Expect error to not exist');
          done();
        });
    });
  
  });
  