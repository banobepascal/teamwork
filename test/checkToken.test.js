/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../api/index';

require('dotenv').config();

chai.use(chaiHttp);
chai.expect();

const payload = {
  email: 'johndoe@test.com',
  password: 'johndoetest',
};

const token = jwt.sign(payload, process.env.JWT_KEY);

describe('TEST Token authorization', () => {
  it('should fail to redirect to route', (done) => {
    chai.request(app)
      .get('/api/v1/articles/4')
      .set('x-auth', token)
      .end((err, res) => {
        expect(res.body.status).to.equals(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equals('unauthorised to use this resource, please signup/login');
        done();
      });
  });
});
