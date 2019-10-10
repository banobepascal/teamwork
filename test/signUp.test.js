/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/index';
import util from './utils/util';

chai.use(chaiHttp);
chai.expect();

describe('Create user', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('Should create user and register to the API', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(util.signUpUser)
        .end((err, res) => {
          expect(res.status).to.equals(201);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equals('user created successfully');
          done();
        });
    });

    // should not sign up user incase email exists
    it('should not singup user incase email exists', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(util.signUpUser)
        .end((err, res) => {
          expect(res.status).to.equals(409);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equals('email already exist');
          done();
        });
    });
  });

  // should not singup user if firstname is doesn't meet expectations
  it('should return error when firstname is wrong', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(util.badFirstname)
      .end((err, res) => {
        expect(res.status).to.equals(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equals(
          'firstname should start with letter and minimum of 3 characters',
        );
        done();
      });
  });

  // should not singup user if lastname doesn't meet expections
  it('should return error when lastname is wrong', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(util.badLastname)
      .end((err, res) => {
        expect(res.status).to.equals(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equals(
          'lastname should start with letter and minimum of 3 characters',
        );
        done();
      });
  });

  // should not singup user if email is not valid
  it('should return error when email is invalid', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(util.badEmail)
      .end((err, res) => {
        expect(res.status).to.equals(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equals(
          'please check the email is in the format: name@domain.com',
        );
        done();
      });
  });

  // should not singup user incase password is weak
  it('should return error when password is weak', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(util.weakPassword)
      .end((err, res) => {
        expect(res.status).to.equals(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equals(
          'password should contain a capital letter, number and a special character (!@#$%^&*)',
        );
        done();
      });
  });

  // should not singup user incase of failed password confirmation
  it('should return error on failed password confirmation', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(util.passwordConfirm)
      .end((err, res) => {
        expect(res.status).to.equals(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equals('passwords do not match!!');
        done();
      });
  });

  // should not singup user incase of any error
  it('should return error when failed to register gender', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(util.badGender)
      .end((err, res) => {
        expect(res.status).to.equals(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equals('gender is either male or female');
        done();
      });
  });

  // should not singup user incase of invalid Job Role
  it('should return error incase of invalid Job Role', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(util.wrongJobRole)
      .end((err, res) => {
        expect(res.status).to.equals(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equals(
          'please submit your correct job role starting with a letter',
        );
        done();
      });
  });

  // should not singup user incase of invalid department
  it('should return error incase of invalid department', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(util.wrongDepartment)
      .end((err, res) => {
        expect(res.status).to.equals(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equals(
          'please enter correct department starting with a letter',
        );
        done();
      });
  });

  // should not singup user incase of invalid Address
  it('should return error incase of invalid Address', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(util.wrongAddress)
      .end((err, res) => {
        expect(res.status).to.equals(400);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equals(
          'please submit correct address starting with a letter',
        );
        done();
      });
  });
});
