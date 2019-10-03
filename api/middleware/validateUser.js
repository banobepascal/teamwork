/* eslint-disable no-useless-escape */
import Joi from 'joi';

const strongPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,12})');
const stringValidator = new RegExp('^(?=.*[a-z])');

const validateUserSignUp = (user) => {
  const schema = {
    firstname: Joi.string().min(3).max(50).regex(stringValidator)
      .required()
      .error(() => ({
        message: 'firstname fails to match required pattern',
      })),
    lastname: Joi.string().min(3).max(50).regex(stringValidator)
      .required()
      .error(() => ({
        message: 'lastname fails to match required pattern',
      })),
    email: Joi.string().min(3).max(255).required()
      .email(),
    password: Joi.string().min(8).max(50).regex(strongPassword)
      .required()
      .error(() => ({
        message: 'password is too weak',
      })),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required()
      .error(() => ({
        message: '!!passwords do not match',
      })),
    gender: Joi.string().lowercase().valid(['male', 'female']).required(),
    jobRole: Joi.string().regex(stringValidator).required()
      .error(() => ({
        message: 'please submit your correct job role',
      })),
    department: Joi.string().regex(stringValidator).required()
      .error(() => ({
        message: 'please enter correct department',
      })),
    address: Joi.string().min(3).regex(stringValidator).required()
      .error(() => ({
        message: 'please submit correct address',
      })),
  };

  return Joi.validate(user, schema);
};


export default validateUserSignUp;
