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

describe('Delete Article', () => {
  describe('DELETE /articles/:id', () => {
    it('should successfully delete an article', (done) => {
      chai
        .request(app)
        .delete('/api/v1/articles/3')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equals(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equals('article successfully deleted');
          done();
        });
    });

    // should fail to delete article that doesnt exist
    it('should fail on invalid article id', (done) => {
      chai
        .request(app)
        .delete('/api/v1/articles/7')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equals(404);
          done();
        });
    });
  });
});

/**
   * @description tests for app v2 of API on deleting a specific article
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {res} success response
   */

describe('Delete Article Version2', () => {
  describe('DELETE /articles/:id', () => {
    it('should successfully delete an article from database', (done) => {
      chai
        .request(app)
        .delete('/api/v2/articles/279361b1-6ef9-401c-acec-182e5ce8da6b')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equals(200);
          expect(res.body).to.have.property('result');
          expect(res.body.result).to.equals('successfully deleted');
          done();
        });
    });

    // should fail to delete article that doesnt exist
    it('should fail on invalid article id in the database', (done) => {
      chai
        .request(app)
        .delete('/api/v2/articles/383eere')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equals(404);
          done();
        });
    });
  });
});
