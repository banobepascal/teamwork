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

describe('Updating Article', () => {
  describe('PATCH /api/v1/articles/:id', () => {
    it('should update article after meeting requirements', (done) => {
      chai
        .request(app)
        .patch('/api/v1/articles/1')
        .set('authorization', token)
        .send(util.article)
        .end((err, res) => {
          expect(res.body.status).to.equals(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equals('article successfully edited');
          done();
        });
    });

    // should not accept update on invalid article
    it('should fail to edit on invalid article', (done) => {
      chai
        .request(app)
        .patch('/api/v1/articles/10')
        .set('authorization', token)
        .send(util.article)
        .end((err, res) => {
          expect(res.body.status).to.equals(404);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equals('article not found');
          done();
        });
    });

    // should not accept update on invalid token
    it('should fail to edit on unsatisfied article', (done) => {
      chai
        .request(app)
        .patch('/api/v1/articles/1')
        .set('authorization', token)
        .send(util.badArticle)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
