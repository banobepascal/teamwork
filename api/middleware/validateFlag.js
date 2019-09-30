import Joi from 'joi';

function validateFlag(req) {
  const schema = {
    flag: Joi.boolean(),
  };

  return Joi.validate(req, schema);
}

export default validateFlag;
