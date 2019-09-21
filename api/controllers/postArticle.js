/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import express from 'express';
import moment from 'moment';
import validateArticle from '../helpers/validateArticle';
import articles from '../models/article';

const articlePost = express.Router();
articlePost.use(express.json());

articlePost.post('/', async (req, res) => {
  const { error } = validateArticle(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const article = {
    id: articles.length + 1,
    title: req.body.title,
    article: req.body.article,
  };

  articles.push(article);
  res.status(200).json({
    status: 200,
    message: 'article successfully created',
    data: {
      id: article.id,
      createdOn: moment().format('LLL'),
      title: req.body.title,
      article: req.body.article,
    },
  });
});

export default articlePost;
