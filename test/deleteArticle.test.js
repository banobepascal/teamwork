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
      chai.request(app)
        .delete('/api/v1/articles/3')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.status).to.equals(204);
          done();
        });
    });

    // should fail to delete article that doesnt exist
    it('should fail on invalid article id', (done) => {
      chai.request(app)
        .delete('/api/v1/articles/7')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body.status).to.equals(404);
          done();
        });
    });
  });
});
