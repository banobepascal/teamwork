/* eslint-disable padded-blocks */
/* eslint-disable radix */
import articles from '../models/article';

class AdminAccess {
  // delete specific flagged article
  static async deleteFlagged(req, res) {
    const flaggedArticle = articles.find((a) => a.id === parseInt(req.params.id));
    if (!flaggedArticle) {
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }

    const index = articles.indexOf(flaggedArticle);
    articles.splice(index, 1);
    return res.status(204).json({
      status: 204,
      message: 'article successfully deleted',
    });
  }
}

export default AdminAccess;
