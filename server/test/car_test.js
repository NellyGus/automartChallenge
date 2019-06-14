import chai from 'chai';
import { expect, assert } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../server';

chai.use(chaiHttp);

describe('test car ad endpoint', () => {
let carAd;
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/car')
      .set({
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
      })
      .send({
        state: 'use' ,
        status: 'available' ,
        price: 2500,
        manufacturer: 'Toyota',
        model: 'corolla' ,
        year: 2012
      })
      .end((err, res) => {
        carAd = res.body.car;
        done();
      });
  });

  //create ad
    it('should create an ad', (done) => {
        chai
        .request(app)
        .post('/api/v1/car')
        .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
        }).send({
            state: 'use' ,
            status: 'available',
            price: 2500,
            manufacturer: 'Toyota',
            model: 'corolla',
            year: 2012
        }).end((err, res) => {
            expect(res.statusCode).to.equal(201);
            expect(res.body.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body.car).to.be.an('object');
            expect(res.body.car.id).to.be.a('number');
            //expect(res.body.car.owner).to.be.a('number');
            expect(res.body.car.created_on).to.be.a('string'); 
            expect(res.body.car.state).to.be.a('string');
            expect(res.body.car.status).to.be.a('string');
            expect(res.body.car.price).to.be.a('number');
            expect(res.body.car.manufacturer).to.be.a('string'); 
            expect(res.body.car.model).to.be.a('string');
            expect(res.body.car.year).to.be.a('number');
            //expect(res.body.car.more_description).to.be.a('string');
            assert.strictEqual(res.statusCode, 201, 'status code is not 201');
            assert.strictEqual(res.status, 201, 'status is not 201');
            assert.isObject(res.body, 'response is not an object');
            assert.isObject(res.body.car, 'car is not an object');
            assert.isNumber(res.body.car.id, 'id is not a number');
            //assert.isNumber(res.body.owner, 'owner is not a number');
            assert.isString(res.body.car.created_on, 'date is not a string');
            assert.isString(res.body.car.state, 'state is not a string');
            assert.isString(res.body.car.status, 'status is not a string');
            assert.isNumber(res.body.car.price, 'price is not a number'); 
            assert.isString(res.body.car.manufacturer, 'manufacturer is not a string');
            assert.isString(res.body.car.model, 'model is not a string');
            assert.isNumber(res.body.car.year, 'year is not a number');
            //assert.isString(res.body.car.more_description, 'more description is not a string');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
    });

    // request not authorized
    it('Should return an error if request is not authorized', (done) => {
        chai
          .request(app)
          .post('/api/v1/car')
          .set({
            'Content-Type': 'application/json',
          })
          .send({
            state: 'use' ,
            status: 'available',
            price: '2500',
            manufacturer: 'Toyota',
            model: 'corolla',
            year: '2012'
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

      // not valid token
      it('Should return an error if token is not valid', (done) => {
        chai
          .request(app)
          .post('/api/v1/car')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOivIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXb20iLCJmaXJzdF9uYW1lIjoibmV2aWxsZSIsImxhc3RfbmFtZSI6IkF1Z3VzdGluIiwicGFzc3dvcmQiOiIkMmIkMDQkSzAvYWtHOGJOUnZ3cFJ3TU52cmJhLlpMM3RkZUdSVURDUTQ5dHpaT0tpdmUyQ21qWkcybG0iLCJhZGRyZXNzIjoiMjA4IFJ1ZSBCS0ssIELDqC1LbGlrYW1lIiwiaXNfYWRtaW4iOmZhbHNlfSwiaWF0IjoxNTYwMDk3NDMyLCJleHAiOjE1NjAxODM4MzJ9.u8IywIdkC6WWpOChA97vO94ix2prnkj3-VdpkB57CgI',
          })
          .send({
            state: 'use' ,
            status: 'available',
            price: '2500',
            manufacturer: 'Toyota',
            model: 'corolla',
            year: 2012
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

      // Manufacturer cannot contain number
      it('Should return an error message if manufacturer field contains a number', (done) => {
        chai
          .request(app)
          .post('/api/v1/car')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .send({
            state: 'use' ,
            status: 'available',
            price: '2500',
            manufacturer: 'manufacturer2012',
            model: 'corolla',
            year: 2012
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
              'Expect error to be car manufacturer cannot contain number');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      // model cannot be empty
      it('Should return an error message if model field is empty', (done) => {
        chai
          .request(app)
          .post('/api/v1/car')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .send({
            state: 'use' ,
            status: 'available',
            price: '2500',
            manufacturer: 'BMW',
            model: '',
            year: 2012
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

      // state cannot be empty
      it('Should return an error message if car state field is empty', (done) => {
        chai
          .request(app)
          .post('/api/v1/car')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .send({
            state: '' ,
            status: 'available',
            price: '2500',
            manufacturer: 'BMW',
            model: '',
            year: 2012
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
              'Car state is required', 'Expect error to be Car state is required');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      // state cannot contain number
      it('Should return an error message if car state contains number', (done) => {
        chai
          .request(app)
          .post('/api/v1/car')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .send({
            state: 'use70' ,
            status: 'available',
            price: '2500',
            manufacturer: 'BMW',
            model: 'model',
            year: 2012
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
              'Car state cannot contain number', 'Expect error to be Car state cannot contain number');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      // year cannot be empty
      it('Should return an error message if year field is empty', (done) => {
        chai
          .request(app)
          .post('/api/v1/car')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .send({
            state: 'use' ,
            status: 'available',
            price: '2500',
            manufacturer: 'BMW',
            model: 'model',
            year: ''
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
              'Enter a valid year, please', 'Expect error to be Enter a valid year, please');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
      
      // year not less or more than 4 digits
      it('Should return an error message if year is less or more than 4 digits', (done) => {
        chai
          .request(app)
          .post('/api/v1/car')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .send({
            state: 'use' ,
            status: 'available',
            price: '2500',
            manufacturer: 'BMW',
            model: 'model',
            year: '410'
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
              'Enter a valid year, please', 'Expect error to be Enter a valid year, please');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      // price should be a number
      it('Should return an error message if price is not number', (done) => {
        chai
          .request(app)
          .post('/api/v1/car')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .send({
            state: 'use' ,
            status: 'available',
            price: 'price',
            manufacturer: 'BMW',
            model: 'model',
            year: 2012
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
              'price is invalid', 'Expect error to be price is invalid');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      // status should not contain number
      it('Should return an error message if status contains number', (done) => {
        chai
          .request(app)
          .post('/api/v1/car')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .send({
            state: 'use' ,
            status: 'available77',
            price: '2500',
            manufacturer: 'BMW',
            model: 'model',
            year: 2012
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
              'Status cannot contain number', 'Expect error to be Status cannot contain number');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      // status cannot be empty
      it('Should return an error message if status field is empty', (done) => {
        chai
          .request(app)
          .post('/api/v1/car')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjoyLCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoibmV2aWxsZSIsImxhc3RfbmFtZSI6IkF1Z3VzdGluIiwicGFzc3dvcmQiOiIkMmIkMDQkSzAvYWtHOGJOUnZ3cFJ3TU52cmJhLlpMM3RkZUdSVURDUTQ5dHpaT0tpdmUyQ21qWkcybG0iLCJhZGRyZXNzIjoiMjA4IFJ1ZSBCS0ssIELDqC1LbGlrYW1lIiwiaXNfYWRtaW4iOmZhbHNlfSwiaWF0IjoxNTYwMDk3NDMyLCJleHAiOjE1NjAxODM4MzJ9.u8IywIdkC6WWpOChA97vO94ix2prnkj3-VeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8kdpkB57CgI',
          })
          .send({
            state: 'use' ,
            status: '',
            price: '2500',
            manufacturer: 'BMW',
            model: 'model',
            year: 2012
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
              'Status is required', 'Expect error to be Status is required');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });

      // view a specific car test
      it('Should get a specific car', (done) => {
        chai
          .request(app)
          .get(`/api/v1/car/${carAd.id}`)
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.car).to.be.an('object');
            expect(res.body.car.id).to.be.a('number');
            expect(res.body.car.created_on).to.be.a('string');
            expect(res.body.car.manufacturer).to.be.a('string');
            expect(res.body.car.model).to.be.a('string');
            expect(res.body.car.price).to.be.a('number');
            expect(res.body.car.status).to.be.a('string');
            expect(res.body.car.year).to.be.a('number');
            expect(res.body.car.state).to.be.a('string');
            assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
            assert.isObject(res.body, 'Data is not an object');
            assert.isObject(res.body.car, 'data is not an object');
            assert.isNumber(res.body.car.id, 'ID is not a number');
            assert.isString(res.body.car.created_on, 'Date is not a string');
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

      // All available cars between a price range
      it('Should return all available cars between a price range', (done) => {
        chai
          .request(app)
          .get('/api/v1/car?status=available&min_price=100000&max_price=150000')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
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
    
      // get all cars
      it('Should return all cars ', (done) => {
        chai
          .request(app)
          .get('/api/v1/cars')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.cars).to.be.an('array');
            assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
            assert.isObject(res.body, 'Response is not an object');
            assert.isArray(res.body.cars, 'Data is not array');
            assert.isNull(err, 'Expect error to not exist');
            done();
          });
      });
    // available cars
      it('Should return all available cars ', (done) => {
        chai
          .request(app)
          .get('/api/v1/car?status=available')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
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

      // specific manufacturer available cars
      it('Should return all available cars of a specific manufacturer', (done) => {
        chai
          .request(app)
          .get('/api/v1/car?status=available&manufacturer=Toyota')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
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

      // available cars of specific state
      it('Should return all available cars of a specific state', (done) => {
        chai
          .request(app)
          .get('/api/v1/car?status=available&state=new')
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
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

      // delete car ad test
      it('Should delete an AD', (done) => {
        chai
          .request(app)
          .delete(`/api/v1/car/${carAd.id}`)
          .set({
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7ImlkIjo2LCJlbWFpbCI6Im5lbGltYUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiQXVndXN0aW4iLCJsYXN0X25hbWUiOiJBdWd1c3RpbiIsInBhc3N3b3JkIjoiJDJiJDA0JGcueXdBclRsaFBZeHZJdFdQZklZN3VBenFwV0lPOGczUkt4UTlZTHFCMTRadWk2NlZPZ2IyIiwiYWRkcmVzcyI6IjIwOCBSdWUgQktLLCBCw6gtS2xpa2FtZSIsImlzX2FkbWluIjpmYWxzZX0sImlhdCI6MTU2MDQ2MzA3NiwiZXhwIjoxNTYwNTQ5NDc2fQ._2-o2JmO-sk5RgVf67CKCrOytXtA0a2ZmW_kEENRA8k',
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.message).to.be.equal('Car deleted successfully');
            expect(res.body.message).to.be.a('string');
            assert.isObject(res.body, 'Response is not an object');
            assert.strictEqual(res.statusCode, 200, 'Status code is not 200');
            assert.isString(res.body.message, 'Data is not a string');
            assert.strictEqual(res.body.message,
              'Car deleted successfully',
              'Data is not equal to Car deleted successfully');
            assert.isNull(err, 'Expect error to not exist');
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
  
    
})