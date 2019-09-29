import Joi from 'joi';

const validateComment = (req) => {
  const schema = {
    comment: Joi.string().min(2).required(),
  };

  return Joi.validate(req, schema);
};

export default validateComment;
