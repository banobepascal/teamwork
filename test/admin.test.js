/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../api/index';
import utils from './utils/util';

require('dotenv').config;

chai.use(chaiHttp);
chai.expect();

const token = jwt.sign(utils.admin, process.env.JWT_KEY);
const badToken = jwt.sign(utils.notAdmin, process.env.JWT_KEY);

describe('Admin Routes', () => {
  describe('GET /api/v1/flagged/articles', () => {
    // should successfully delete an article flagged inappropiate
    it('should successfully delete an article', (done) => {
      chai
        .request(app)
        .delete('/api/v1/flagged/articles/4')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equals(204);
          done();
        });
    });

    // should fail to delete invalid article
    it('should fail to delete invalid article', (done) => {
      chai
        .request(app)
        .delete('/api/v1/flagged/articles/10')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body.status).to.equals(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equals('article not found');
          done();
        });
    });

    // should not access routes if not admin
    it('should not access routes if not admin', (done) => {
      chai
        .request(app)
        .delete('/api/v1/flagged/articles/2')
        .set('authorization', badToken)
        .end((err, res) => {
          expect(res.body.status).to.equals(403);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equals('cant access this resource');
          done();
        });
    });
  });
});
