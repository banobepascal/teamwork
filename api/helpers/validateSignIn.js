import Joi from 'joi';

function validate(req) {
  const schema = {
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(8).required(),
  };

  return Joi.validate(req, schema);
}

export default validate;
