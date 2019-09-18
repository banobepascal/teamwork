/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/index';
import util from './utils/util';

chai.use(chaiHttp);
chai.should();

describe('Create user', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('Should create user and register to the API', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(util.signUpUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message', 'User created successfully');
          done();
        });
    });

    // should not singup user incase of any error
    it('should return error when failed to register', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(util.baduser)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
