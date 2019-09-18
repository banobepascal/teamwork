import Joi from 'joi';

function validateUser(user) {
  const schema = {
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(8).required(),
  };

  return Joi.validate(user, schema);
}

export default validateUser;
