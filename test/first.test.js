/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/Auth/signup';

chai.use(chaiHttp);
chai.should();

describe('Create user', () => {
  describe('POST /', () => {
    it('Should create user and register to the API', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
