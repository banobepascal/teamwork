/* eslint-disable radix */
import moment from 'moment';
import _ from 'lodash';
import validateArticle from '../middleware/validateArticle';
import articles from '../models/article';
import comments from '../models/comment';

class Article {
  // view feeds and all articles posted with date
  static async viewFeeds(req, res) {
    const articlesOrder = _.sortBy(articles, 'createdOn').reverse();
    return res.status(200).json({
      status: 200,
      data: articlesOrder,
    });
  }

  // view specific article
  static async viewSpecific(req, res) {
    const article = articles.find((a) => a.id === parseInt(req.params.id));
    if (!article) {
      res.status(404).json({
        status: 404,
        message: 'article not found',
      });
    }

    res.status(200).json({
      status: 200,
      data: {
        article,
        comments,
      },
    });
  }

  // Post article to teamwork

  static async postArticle(req, res) {
    const { error } = validateArticle(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const article = {
      id: articles.length + 1,
      title: req.body.title,
      article: req.body.article,
    };

    articles.push(article);
    return res.status(200).json({
      status: 200,
      message: 'article successfully created',
      data: {
        id: article.id,
        createdOn: moment().format('LLL'),
        title: req.body.title,
        article: req.body.article,
      },
    });
  }

  // edit posted article

  static async editArticle(req, res) {
    const article = articles.find((a) => a.id === parseInt(req.params.id));
    if (!article) {
      return res.status(404).json({
        status: 404,
        message: 'article not found',
      });
    }

    const { error } = validateArticle(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    return res.status(200).json({
      status: 200,
      message: 'article successfully edited',
      data: {
        id: article.id,
        updatedOn: moment().format('LLL'),
        title: req.body.title,
        article: req.body.article,
      },
    });
  }

  // delete posted article

  static async deleteArticle(req, res) {
    const article = articles.find((a) => a.id === parseInt(req.params.id));
    if (!article) {
      res.status(404).json({
        status: 404,
        message: 'Article not found',
      });
    }

    const index = articles.indexOf(article);
    articles.splice(index, 1);

    res.status(200).json({
      status: 204,
      message: 'article successfully deleted',
    });
  }
}

export default Article;
