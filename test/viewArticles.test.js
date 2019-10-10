/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../api/index';
import util from './utils/util';

require('dotenv').config();

chai.use(chaiHttp);
chai.expect();

const token = jwt.sign(util.payload, process.env.JWT_KEY);

describe('GET /feeds', () => {
  it('should show the most recently posted articles first.', (done) => {
    chai.request(app)
      .get('/api/v1/feeds')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body.status).to.equals(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equals('articles retrieved');

        done();
      });
  });
});

/**
   * @description tests for app v2 of API on getting a all articles
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {res} success response
   */

describe('GET /feeds', () => {
  it('should fail on fetching articles.', (done) => {
    chai.request(app)
      .get('/api/v2/feeds')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body.status).to.equals(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.equals('no articles found');
        done();
      });
  });
});
