import Joi from 'joi';

const validInput = new RegExp('^(?=.*[a-z])');

function validateArticle(req) {
  const schema = {
    title: Joi.string().min(3).max(50).regex(validInput)
      .required()
      .error(() => ({
        message: 'title does not meet expectations',
      })),
    article: Joi.string().min(50).regex(validInput)
      .required()
      .error(() => ({
        message: 'article does not meet expectations',
      })),
  };

  return Joi.validate(req, schema);
}

export default validateArticle;
