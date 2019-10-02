/* eslint-disable padded-blocks */
/* eslint-disable radix */
import moment from 'moment';
import _ from 'lodash';
import validateArticle from '../middleware/validateArticle';
import validateFlag from '../middleware/validateFlag';
import articles from '../models/article';

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
        error: 'article not found',
      });
    }

    res.status(200).json({
      status: 200,
      data: article,
    });
  }

  // Post article to teamwork
  static async postArticle(req, res) {
    const { error } = validateArticle(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }

    const article = {
      id: articles.length + 1,
      createdOn: moment().format('LLL'),
      title: req.body.title,
      article: req.body.article,
      comments: [],
    };

    articles.push(article);
    return res.status(201).json({
      status: 201,
      message: 'article successfully created',
      data: {
        id: article.id,
        createdOn: moment().format('LLL'),
        title: req.body.title,
        article: req.body.article,
        comments: article.comments,
      },
    });
  }

  // edit posted article
  static async editArticle(req, res) {
    const article = articles.find((a) => a.id === parseInt(req.params.id));
    if (!article) {
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }

    const { error } = validateArticle(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }

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
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }

    const index = articles.indexOf(article);
    articles.splice(index, 1);

    return res.status(204).json({
      status: 204,
      message: 'article successfully deleted',
    });
  }

  // flag article as inaproppiate
  static async flagArticle(req, res) {
    const article = articles.find((a) => a.id === parseInt(req.params.id));
    if (!article) {
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }

    const flag = {
      flag: req.body.flag,
    };

    const { error } = validateFlag(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }

    articles.push(article.flag.push(flag));
    return res.status(201).json({
      status: 201,
      message: 'article has been flagged as inapropiate',
      data: {
        id: article.id,
        flag: req.body.flag,
      },
    });
  }
}

export default Article;
