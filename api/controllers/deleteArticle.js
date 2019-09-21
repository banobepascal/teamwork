/* eslint-disable radix */
import articles from '../models/article';

const deleteArticle = ('/:id', async (req, res) => {
  const article = articles.find((a) => a.id === parseInt(req.params.id));
  if (!article) {
    res.status(404).json({
      status: 404,
      message: 'Article not found',
    });
  }

  const index = articles.indexOf(article);
  articles.splice(index, 1);

  res.status(200).json({
    status: 204,
    message: 'article successfully deleted',
  });
});

export default deleteArticle;
