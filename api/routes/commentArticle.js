import express from 'express';
import comment from '../controllers/commentController';
import validation from '../middleware/validation';

const commentRoute = express.Router();

commentRoute.post(
  '/api/v1/articles/:id/comments',
  validation.checkToken,
  comment.commentArticle,
);

export default commentRoute;
