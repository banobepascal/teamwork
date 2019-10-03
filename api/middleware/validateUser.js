/* eslint-disable no-useless-escape */
import Joi from 'joi';

const strongPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,12})');
const stringValidator = new RegExp('^(^[a-zA-Z])(?=.*[a-z])');

const validateUserSignUp = (user) => {
  const schema = {
    firstname: Joi.string().min(3).max(50).regex(stringValidator)
      .required()
      .error(() => ({
        message: 'firstname should start with letter and minimum of 3 characters',
      })),
    lastname: Joi.string().min(3).max(50).regex(stringValidator)
      .required()
      .error(() => ({
        message: 'lastname should start with letter and minimum of 3 characters',
      })),
    email: Joi.string().min(3).max(255).required()
      .email()
      .error(() => ({
        message: 'Please check the email is in the format: name@domain.com',
      })),
    password: Joi.string().min(8).max(50).regex(strongPassword)
      .required()
      .error(() => ({
        message: 'password should contain a capital letter, number and a special character (!@#\$%\^&\*)',
      })),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required()
      .error(() => ({
        message: 'passwords do not match!!',
      })),
    gender: Joi.string().lowercase().valid(['male', 'female']).required()
      .error(() => ({
        message: 'gender is either male or female',
      })),
    jobRole: Joi.string().regex(stringValidator).required()
      .error(() => ({
        message: 'please submit your correct job role starting with a letter',
      })),
    department: Joi.string().regex(stringValidator).required()
      .error(() => ({
        message: 'please enter correct department starting with a letter',
      })),
    address: Joi.string().min(3).regex(stringValidator).required()
      .error(() => ({
        message: 'please submit correct address starting with a letter',
      })),
  };

  return Joi.validate(user, schema);
};


export default validateUserSignUp;
