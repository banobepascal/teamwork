import express from 'express';
import article from '../controllers/articleController';
import CheckToken from '../middleware/verifyToken';
import Helpers from '../helpers/validInputs';

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
  Helpers.articleRules,
  article.postArticle,
);
articleRoute.patch(
  '/api/v2/articles/:id',
  CheckToken.verifyToken,
  Helpers.articleRules,
  article.editArticle,
);
articleRoute.post(
  '/api/v2/articles/:id',
  CheckToken.verifyToken,
  Helpers.flagRules,
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
  Helpers.getArticleId,
  Helpers.commentRules,
  article.commentArticle,
);

export default articleRoute;
