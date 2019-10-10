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

describe('TEST Token authorization', () => {
  it('should fail on wrong token provided', (done) => {
    chai
      .request(app)
      .delete('/api/v1/articles/4')
      .set('x-auth', token)
      .end((err, res) => {
        expect(res.body.status).to.equals(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equals('please provide token');
        done();
      });
  });
});

/**
   * @description tests token for the database
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */

describe('TEST Token authorization', () => {
  it('should fail on wrong token provided', (done) => {
    chai
      .request(app)
      .delete('/api/v2/articles/443ac559-6fbe-4394-b1c9-74d367498d3a')
      .set('x-auth', token)
      .end((err, res) => {
        expect(res.body.status).to.equals(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equals('please provide token');
        done();
      });
  });
});
