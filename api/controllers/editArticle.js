/* eslint-disable consistent-return */
/* eslint-disable radix */
import moment from 'moment';
import articles from '../models/article';
import validateArticle from '../helpers/validateArticle';


const editArticle = ('/:id', async (req, res) => {
  // eslint-disable-next-line eqeqeq
  const article = articles.find((a) => a.id === parseInt(req.params.id));
  if (!article) {
    res.status(404).json({
      status: 404,
      message: 'article not found',
    });
  }

  const { error } = validateArticle(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  res.status(200).json({
    status: 200,
    message: 'article successfully edited',
    data: {
      id: article.id,
      updatedOn: moment().format('LLL'),
      title: req.body.title,
      article: req.body.article,
    },
  });
});

export default editArticle;
