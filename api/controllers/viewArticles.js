import express from 'express';
import _ from 'lodash';
import articles from '../models/article';

const viewArticles = express.Router();
viewArticles.use(express.json());

viewArticles.get('/', async (req, res) => {
  const articlesOrder = _.sortBy(articles, 'createdOn').reverse();
  return res.status(200).json({
    status: 200,
    data: articlesOrder,
  });
});

export default viewArticles;
