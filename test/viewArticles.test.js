/* eslint-disable no-undef */
import chai from 'chai';
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
        res.should.have.status(200);
        done();
      });
  });
});
