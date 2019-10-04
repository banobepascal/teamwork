import express from 'express';
import article from '../controllers/articleController';
import validation from '../middleware/validation';

const articleRoute = express.Router();

articleRoute.get('/api/v1/feeds', validation.checkToken, article.viewFeeds);
articleRoute.get('/api/v1/articles/:id', validation.checkToken, article.viewSpecific);
articleRoute.post('/api/v1/articles', validation.checkToken, article.postArticle);
articleRoute.patch('/api/v1/articles/:id', validation.checkToken, article.editArticle);
articleRoute.post('/api/v1/articles/:id', validation.checkToken, article.flagArticle);
articleRoute.delete('/api/v1/articles/:id', validation.checkToken, article.deleteArticle);

export default articleRoute;
