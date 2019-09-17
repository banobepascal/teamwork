/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/index';

chai.use(chaiHttp);
chai.should();

describe('Create user', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('should return error when failed to register', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('Should create user and register to the API', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message', 'User created successfully');
          done();
        });
    });
  });
});
