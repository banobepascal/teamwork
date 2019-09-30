/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../api/index';

require('dotenv').config;

chai.use(chaiHttp);
chai.expect();

const payload = {
  email: 'johndoe@test.com',
  password: 'johndoetest',
  isAdmin: true,
};

const token = jwt.sign(payload, process.env.JWT_KEY);

describe('Getting Flagged articles', () => {
  describe('GET /api/v1/flagged/articles', () => {
    it('should get all articles flagged innapropiate', (done) => {
      chai
        .request(app)
        .get('/api/v1/flagged/articles')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body.status).to.equals(200);
          done();
        });
    });

    // should successfully delete an article flagged inappropiate
    it('should successfully delete an article', (done) => {
      chai.request(app)
        .delete('/api/v1/flagged/articles/4')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equals(204);
          done();
        });
    });
  });
});
