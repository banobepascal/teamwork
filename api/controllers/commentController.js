/* eslint-disable radix */
import articles from '../models/article';
import validateComment from '../middleware/validateComment';

class ArticleComment {
  // comment on a posted article
  static async commentArticle(req, res) {
    const article = articles.find((a) => a.id === parseInt(req.params.id));
    if (!article) {
      return res.status(404).json({
        status: 404,
        error: 'article not found',
      });
    }

    const { error } = validateComment(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/[/"]/g, ''),
      });
    }

    const comment = {
      commentId: articles.length + 1,
      authorId: articles.length + 1,
      comment: req.body.comment,
    };

    articles.push(article.comments.push(comment));
    return res.status(201).json({
      status: 201,
      message: 'your comment has been sent',
      data: {
        id: article.id,
        createdOn: article.createdOn,
        articleTitle: article.title,
        article: article.article,
        comment: req.body.comment,
      },
    });
  }
}

export default ArticleComment;
