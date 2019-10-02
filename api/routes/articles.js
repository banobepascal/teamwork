import express from 'express';
import article from '../controllers/articleController';
import authToken from '../middleware/checkToken';

const articleRoute = express.Router();

articleRoute.get('/api/v1/feeds', authToken, article.viewFeeds);
articleRoute.get('/api/v1/articles/:id', authToken, article.viewSpecific);
articleRoute.post('/api/v1/articles', authToken, article.postArticle);
articleRoute.patch('/api/v1/articles/:id', authToken, article.editArticle);
articleRoute.post('/api/v1/articles/:id', authToken, article.flagArticle);
articleRoute.delete('/api/v1/articles/:id', authToken, article.deleteArticle);

export default articleRoute;
