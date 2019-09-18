/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/index';
import util from './utils/util';

chai.use(chaiHttp);
chai.should();

describe('Signin User', () => {
  describe('POST /', () => {
    it('Should successfully login a user', (done) => {
      chai.request(app)
        .post('api/v1/auth/signin')
        // .send(util.loginuser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message', 'User is successfuly logged in');
          done();
        });
    });
  });
});
