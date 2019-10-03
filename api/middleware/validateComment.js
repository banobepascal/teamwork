/* eslint-disable no-useless-escape */
import Joi from 'joi';

const validInput = new RegExp('^(?=.*[a-z])');

const validateComment = (req) => {
  const schema = {
    comment: Joi.string().min(3).max(50).regex(validInput)
      .required()
      .error(() => ({
        message: 'comment does not meet expectations',
      })),
  };

  return Joi.validate(req, schema);
};

export default validateComment;
