import express from 'express';
import comment from '../controllers/commentController';

const commentRoute = express.Router();

commentRoute.post('/articles/:id/comments', comment.commentArticle);


export default commentRoute;
