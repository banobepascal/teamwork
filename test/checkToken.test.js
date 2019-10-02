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
    chai.request(app)
      .delete('/api/v1/articles/4')
      .set('x-auth', token)
      .end((err, res) => {
        expect(res.body.status).to.equals(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equals('unauthorised to use this resource, please signup/login');
        done();
      });
  });
});
