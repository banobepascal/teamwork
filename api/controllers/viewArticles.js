import _ from 'lodash';
import articles from '../models/article';

const viewArticles = ('/', (req, res) => {
  const articlesOrder = _.sortBy(articles, 'createdOn').reverse();
  return res.status(200).json({
    status: 200,
    data: articlesOrder,
  });
});

export default viewArticles;
