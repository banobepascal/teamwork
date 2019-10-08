import express from 'express';
import article from '../controllers/articleController';
import CheckToken from '../middleware/verifyToken';
import rules from '../middleware/validInputs';

const articleRoute = express.Router();

articleRoute.get('/api/v2/feeds', CheckToken.verifyToken, article.viewFeeds);
articleRoute.get(
  '/api/v2/articles/:id',
  CheckToken.verifyToken,
  article.viewSpecific,
);

articleRoute.get(
  '/api/v2/articles/tag/:title',
  CheckToken.verifyToken,
  article.specificTag,
);
articleRoute.post(
  '/api/v2/articles',
  CheckToken.verifyToken,
  rules.articleRules,
  article.postArticle,
);
articleRoute.patch(
  '/api/v2/articles/:id',
  CheckToken.verifyToken,
  rules.articleRules,
  article.editArticle,
);
articleRoute.post(
  '/api/v2/articles/:id',
  CheckToken.verifyToken,
  rules.flagRules,
  article.flagArticle,
);
articleRoute.delete(
  '/api/v2/articles/:id',
  CheckToken.verifyToken,
  article.deleteArticle,
);
articleRoute.post(
  '/api/v2/articles/:id/comments',
  CheckToken.verifyToken,
  rules.commentRules,
  article.commentArticle,
);
export default articleRoute;
