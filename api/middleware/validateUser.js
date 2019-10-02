/* eslint-disable no-useless-escape */
import Joi from 'joi';

const validateUserSignUp = (user) => {
  const schema = {
    firstname: Joi.string().min(3).max(50).required(),
    lastname: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(255).required()
      .email(),
    password: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,12})'),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required().options({
      language: {
        any: {
          allowOnly: '!!Passwords do not match',
        },
      },
    }),
    gender: Joi.string().lowercase().valid(['male', 'female']).required(),
    jobRole: Joi.string().required(),
    department: Joi.string().required(),
    address: Joi.string().required(),
  };

  return Joi.validate(user, schema);
};


export default validateUserSignUp;
