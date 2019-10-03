import Joi from 'joi';

const validInput = new RegExp('^(?=.*[a-z])');

function validateArticle(req) {
  const schema = {
    title: Joi.string().min(3).max(50).regex(validInput)
      .required()
      .error(() => ({
        message: 'title should have a letter and minimum of 3 characters',
      })),
    article: Joi.string().min(50).regex(validInput)
      .required()
      .error(() => ({
        message: 'article should have a letter and minimum of 3 characters',
      })),
  };

  return Joi.validate(req, schema);
}

export default validateArticle;
