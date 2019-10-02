/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../api/index';
import util from './utils/util';

require('dotenv').config();

chai.use(chaiHttp);
chai.expect();

const payload = {
  email: 'johndoe@test.com',
  password: 'johndoetest',
};

const token = jwt.sign(payload, process.env.JWT_KEY);

describe('Creating Article', () => {
  describe('POST /api/v1/articles', () => {
    it('should create and post article', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .set('authorization', token)
        .send(util.article)
        .end((err, res) => {
          expect(res.body.status).to.equals(201);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equals('article successfully created');
          done();
        });
    });

    // should fail to create article that doesnot meet title expectations
    it('should not post unsatisfied article with wrong title', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .set('authorization', token)
        .send(util.badTitle)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    // should fail to create article that doesnot meet expectations
    it('should not post unsatisfied article with wrong article body', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .set('authorization', token)
        .send(util.badArticle)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});

describe('Flagging an Article', () => {
  describe('POST /api/v1/articles/:id', () => {
    it('should accept and post a flag', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/1')
        .set('authorization', token)
        .send(util.goodFlag)
        .end((err, res) => {
          expect(res.body.status).to.equals(201);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equals('article has been flagged as inapropiate');
          done();
        });
    });

    // should not accept flagging on invalid article
    it('should fail to accept flagging on invalid article', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/10')
        .set('authorization', token)
        .send(util.goodFlag)
        .end((err, res) => {
          expect(res.body.status).to.equals(404);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equals('article not found');
          done();
        });
    });

    // should not accept flagging on bad flag
    it('should not accept flagging on bad flag', (done) => {
      chai
        .request(app)
        .post('/api/v1/articles/1')
        .set('authorization', token)
        .send(util.badFlag)
        .end((err, res) => {
          expect(res.body.status).to.equals(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equals('flag must be a boolean');
          done();
        });
    });
  });
});
