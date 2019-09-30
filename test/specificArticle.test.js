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
};

const token = jwt.sign(payload, process.env.JWT_KEY);

describe('Updating Article', () => {
  describe('GET /api/v1/articles/:id', () => {
    it('should show specific article', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles/1')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body.status).to.equals(200);
          done();
        });
    });

    // should not accept update on invalid article
    it('should fail to view on invalid article', (done) => {
      chai
        .request(app)
        .get('/api/v1/articles/7')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body.status).to.equals(404);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equals('article not found');
          done();
        });
    });
  });
});
