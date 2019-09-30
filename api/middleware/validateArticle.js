import Joi from 'joi';

function validateArticle(req) {
  const schema = {
    title: Joi.string().min(5).required(),
    article: Joi.string().min(20).required(),
  };

  return Joi.validate(req, schema);
}

export default validateArticle;
