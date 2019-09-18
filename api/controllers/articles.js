/* eslint-disable consistent-return */
import express from 'express';
import moment from 'moment';
import _ from 'lodash';
import validateArticle from '../helpers/validateArticle';
import articles from '../models/article';

const articlePost = express.Router();
articlePost.use(express.json());

articlePost.post('/', async (req, res) => {
  const { error } = validateArticle(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const article = _.pick(req.body, [
    'title',
    'article',
  ]);

  articles.push(article);
  res.status(200).json({
    status: 200,
    message: 'article successfully created',
    data: {
      createdOn: moment().format('LLL'),
      title: req.body.title,
      article: req.body.article,
    },
  });
});

export default articlePost;
