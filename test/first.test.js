/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
chai.should();

describe('Create user', () => {
  describe('POST /', () => {
    it('Should create user and register to the API', (done) => {
      chai.request(app)
        .post('api/v1/auth/signup')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    // fails to register user
    it('Should reject user incase of error', (done) => {
      chai.request(app)
        .post('api/v1/auth/signup')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
