/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/index';
import util from './utils/util';

chai.use(chaiHttp);
chai.expect();

describe('Creating Article', () => {
  describe('POST /api/v1/articles', () => {
    it('should create and post article', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .send(util.article)
        .end((err, res) => {
          expect(res.body.status).to.equals(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equals('article successfully created');
          done();
        });
    });

    // should fail to create article that doesnot meet expectations
    it('should not post unsatisfied article', (done) => {
      chai.request(app)
        .post('/api/v1/articles')
        .send(util.badArticle)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
