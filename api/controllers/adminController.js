/* eslint-disable padded-blocks */
/* eslint-disable radix */
import _ from 'lodash';
import articles from '../models/article';

class AdminAccess {

  // view all fagged articles posted with date
  static async viewFlagged(req, res) {
    const flagged = _.sortBy(articles, ['flag']);
    return res.status(200).json({
      status: 200,
      data: flagged,
    });
  }

  // delete specific flagged article
  static async deleteFlagged(req, res) {
    const flaggedArticle = articles.find((a) => a.id === parseInt(req.params.id));
    if (flaggedArticle) {
      const index = articles.indexOf(flaggedArticle);
      articles.splice(index, 1);
    }

    return res.status(204).json({
      status: 204,
      message: 'article successfully deleted',
    });
  }
}

export default AdminAccess;
