/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/index';
import util from './utils/util';

chai.expect();
chai.use(chaiHttp);

describe('Signin User', () => {
  describe('POST /api/v1/auth/signin', () => {
    it('Should successfully login a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(util.loginuser)
        .end((err, res) => {
          expect(res.body.status).to.equals(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equals('user is successfuly logged in');
          done();
        });
    });

    // Should not register user if email is incorrect
    it('Should not login if email doesnt exist', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(util.bademail)
        .end((err, res) => {
          expect(res.body.status).to.equals(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equals('wrong email or password');
          done();
        });
    });

    // // should fail login user if password is incorrect
    it('Should fail login user if password is incorrect', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(util.badpassword)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
