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
