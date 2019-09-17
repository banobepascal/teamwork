import Joi from 'joi';

const validateUserSignIn = (user) => {
  const schema = {
    email: Joi.string().min(),
  };
};
