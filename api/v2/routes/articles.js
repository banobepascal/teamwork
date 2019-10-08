import express from 'express';
import article from '../controllers/articleController';
import validation from '../../middleware/validation';
import rules from '../middleware/validInputs';

const articleRoute = express.Router();

articleRoute.get('/api/v2/feeds', validation.checkToken, article.viewFeeds);
articleRoute.get(
  '/api/v2/articles/:id',
  validation.checkToken,
  article.viewSpecific,
);
articleRoute.post(
  '/api/v2/articles',
  validation.checkToken,
  rules.articleRules,
  article.postArticle,
);
articleRoute.patch(
  '/api/v2/articles/:id',
  validation.checkToken,
  rules.articleRules,
  article.editArticle,
);
articleRoute.post(
  '/api/v2/articles/:id',
  validation.checkToken,
  rules.flagRules,
  article.flagArticle,
);
articleRoute.delete(
  '/api/v2/articles/:id',
  validation.checkToken,
  article.deleteArticle,
);
articleRoute.post(
  '/api/v2/articles/:id/comments',
  validation.checkToken,
  rules.commentRules,
  article.commentArticle,
);
export default articleRoute;
