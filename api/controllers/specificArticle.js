/* eslint-disable consistent-return */
/* eslint-disable radix */
import articles from '../models/article';
import comments from '../models/comment';

const viewSpecific = ('/', async (req, res) => {
  // eslint-disable-next-line eqeqeq
  const article = articles.find((a) => a.id === parseInt(req.params.id));
  if (!article) {
    res.status(404).json({
      status: 404,
      message: 'article not found',
    });
  }

  res.status(200).json({
    status: 200,
    data: {
      article,
      comments,
    },
  });
});

export default viewSpecific;
