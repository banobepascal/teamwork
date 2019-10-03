/* eslint-disable no-useless-escape */
import Joi from 'joi';

const validInput = new RegExp('^(?=.*[a-z])');

const validateComment = (req) => {
  const schema = {
    comment: Joi.string().min(3).regex(validInput)
      .required()
      .error(() => ({
        message: 'comment should have a letter and minimum of 3 characters',
      })),
  };

  return Joi.validate(req, schema);
};

export default validateComment;
