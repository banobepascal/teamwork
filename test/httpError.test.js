/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/index';
import util from './utils/util';

chai.expect();
chai.use(chaiHttp);

describe('Bad Method', () => {
  describe('PUT /api/v1/auth/signin', () => {
    it('Should fail on bad method', (done) => {
      chai
        .request(app)
        .put('/api/v1/auth/signin')
        .send(util.loginuser)
        .end((err, res) => {
          expect(res.body.status).to.equals(405);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equals('method not allowed');
          done();
        });
    });

    it('Should fail on bad request', (done) => {
      chai
        .request(app)
        .post('/*')
        .send(util.loginuser)
        .end((err, res) => {
          expect(res.body.status).to.equals(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equals('invalid route, please check your route');
          done();
        });
    });
  });
});
