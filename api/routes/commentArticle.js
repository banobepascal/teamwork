import express from 'express';
import comment from '../controllers/commentController';
import auth from '../middleware/checkToken';

const commentRoute = express.Router();

commentRoute.post('/api/v1/articles/:id/comments', auth, comment.commentArticle);

export default commentRoute;
