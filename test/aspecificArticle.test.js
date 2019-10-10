/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../api/index';
import util from './utils/util';

require('dotenv').config;

chai.use(chaiHttp);
chai.expect();

const token = jwt.sign(util.payload, process.env.JWT_KEY);

describe('GET SPECIFIC ARTICLE', () => {
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
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equals('article not found');
          done();
        });
    });
  });
});

/**
   * @description tests for app v2 of API on getting a specific article
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {res} success response
   */

describe('GET SPECIFIC ARTICLE', () => {
  describe('GET /api/v2/articles/:id', () => {
    it('should show specific article', (done) => {
      chai
        .request(app)
        .get('/api/v2/articles/117ed64f-c940-40d9-b1f9-eea53a9be861')
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
        .get('/api/v2/articles/7')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equals(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equals('article not found');
          done();
        });
    });
  });
});
