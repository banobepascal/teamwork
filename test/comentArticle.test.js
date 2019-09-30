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

const payload = {
  email: 'johndoe@test.com',
  password: 'johndoetest',
};

const token = jwt.sign(payload, process.env.JWT_KEY);

describe('Comment Article', () => {
  describe('POST /api/v1/articles/:id/comments', () => {
    it('should post comment on article', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/1/comments')
        .set('authorization', token)
        .send(util.goodComment)
        .end((err, res) => {
          expect(res.body.status).to.equals(201);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equals('your comment has been sent');
          done();
        });
    });

    // should not accept comment on invalid article
    it('should fail to post comment on invalid article', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/6/comments')
        .set('authorization', token)
        .send(util.goodComment)
        .end((err, res) => {
          expect(res.body.status).to.equals(404);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equals('article not found');
          done();
        });
    });

    // should not accept comment not meeting requirements
    it('should fail to post on unsatisfied comment', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/1/comments')
        .set('authorization', token)
        .send(util.badComment)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
