/* eslint-disable padded-blocks */
/* eslint-disable radix */
import moment from 'moment';
import _ from 'lodash';
import validateArticle from '../middleware/validateArticle';
import validateFlag from '../middleware/validateFlag';
import articles from '../models/article';

class Article {
  // view feeds and all articles posted with date
  static viewFeeds(req, res) {
    const articlesOrder = _.sortBy(articles, ['createdOn']).reverse();
    return res.status(200).json({
      status: 200,
      message: 'articles retrieved',
      data: articlesOrder,
    });
  }

  // view specific article
  static viewSpecific(req, res) {
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
  static postArticle(req, res) {
    const { error } = validateArticle(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/[/"]/g, ''),
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
      },
    });
  }

  // edit posted article
  static editArticle(req, res) {
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
        error: error.details[0].message.replace(/[/"]/g, ''),
      });
    }

    article.article = req.body.article;
    article.createdOn = moment().format('LLL');
    return res.status(200).json({
      status: 200,
      message: 'article successfully edited',
      data: {
        id: article.id,
        createdOn: moment().format('LLL'),
        title: req.body.title,
        article: req.body.article,
      },
    });
  }

  // delete posted article
  static deleteArticle(req, res) {
    const article = articles.find((a) => a.id === parseInt(req.params.id));
    if (!article) {
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }

    const index = articles.indexOf(article);
    articles.splice(index, 1);

    return res.status(200).json({
      status: 204,
      message: 'article successfully deleted',
    });
  }

  // flag article as inaproppiate
  static flagArticle(req, res) {
    const article = articles.find((a) => a.id === parseInt(req.params.id));
    if (!article) {
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }

    const { error } = validateFlag(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/[/"]/g, ''),
      });
    }

    article.status = req.body.flag;
    return res.status(201).json({
      status: 201,
      message: 'article has been flagged as inapropiate',
      data: {
        id: article.id,
        status: req.body.flag,
      },
    });
  }
}

export default Article;
