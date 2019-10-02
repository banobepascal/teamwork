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
          res.body.should.have.property('message', 'user created successfully');
          done();
        });
    });

    // should not sign up user incase email exists
    it('should not singup user incase email exists', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(util.signUpUser)
        .end((err, res) => {
          res.should.have.status(409);
          done();
        });
    });
  });

  // should not singup user if firstname is doesn't meet expectations
  it('should return error when firstname is wrong', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(util.badFirstname)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', 'firstname fails to match required pattern');
        done();
      });
  });

  // should not singup user if lastname doesn't meet expections
  it('should return error when lastname is wrong', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(util.badLastname)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', 'lastname fails to match required pattern');
        done();
      });
  });

  // should not singup user if email is not valid
  it('should return error when email is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(util.badEmail)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', 'email must be a valid email');
        done();
      });
  });

  // should not singup user incase password is weak
  it('should return error when password is weak', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(util.weakPassword)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', 'password is too weak');
        done();
      });
  });

  // should not singup user incase of failed password confirmation
  it('should return error on failed password confirmation', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(util.passwordConfirm)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', '!!passwords do not match');
        done();
      });
  });

  // should not singup user incase of any error
  it('should return error when failed to register', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(util.badGender)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  // should not singup user incase of invalid Job Role
  it('should return error incase of invalid Job Role', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(util.wrongJobRole)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', 'please submit your correct job role');
        done();
      });
  });

  // should not singup user incase of invalid department
  it('should return error incase of invalid department', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(util.wrongDepartment)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', 'please enter correct department');
        done();
      });
  });

  // should not singup user incase of invalid Address
  it('should return error incase of invalid Address', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(util.wrongAddress)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error', 'please submit correct address');
        done();
      });
  });
});
