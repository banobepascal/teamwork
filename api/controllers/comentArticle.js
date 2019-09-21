/* eslint-disable consistent-return */
/* eslint-disable radix */
import express from 'express';
import articles from '../models/article';
import validateComment from '../helpers/validateComment';

const comentArticle = express.Router();
comentArticle.use(express.json());

comentArticle.post('/:id/comments', (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.id));
  if (!article) {
    res.status(404).json({
      status: 404,
      message: 'Article not found',
    });
  }

  const { error } = validateComment(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  return res.status(201).json({
    status: 201,
    message: 'Your comment has been sent',
    data: {
      createdOn: article.createdOn,
      articleTitle: article.title,
      article: article.article,
      comment: req.body.comment,
    },

  });
});

export default comentArticle;