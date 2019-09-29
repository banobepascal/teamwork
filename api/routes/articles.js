import express from 'express';
import article from '../controllers/articleController';

const articleRoute = express.Router();

articleRoute.get('/feeds', article.viewFeeds);
articleRoute.get('/articles/:id', article.viewSpecific);
articleRoute.post('/articles', article.postArticle);
articleRoute.patch('/articles/:id', article.editArticle);
articleRoute.delete('/articles/:id', article.deleteArticle);

export default articleRoute;
