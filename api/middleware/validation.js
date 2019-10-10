/* eslint-disable no-useless-escape */
import Joi from 'joi';
import ENV from 'dotenv';
import jwt from 'jsonwebtoken';

ENV.config();

class Validation {
  static validateUserSignUp(user) {
    const strongPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,12})');
    const stringValidator = new RegExp('^(^[a-zA-Z])(?=.*[a-z])');

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
          message: 'please check the email is in the format: name@domain.com',
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
      jobrole: Joi.string().regex(stringValidator).required()
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
  }

  static validateFlag(req) {
    const schema = {
      flag: Joi.boolean(),
    };
    return Joi.validate(req, schema);
  }

  static validateComment(req) {
    const validInput = new RegExp('^(?=.*[a-z])');
    const schema = {
      comment: Joi.string().min(3).regex(validInput)
        .required()
        .error(() => ({
          message: 'comment should have a letter and minimum of 3 characters',
        })),
    };

    return Joi.validate(req, schema);
  }

  static validateArticle(req) {
    const validInput = new RegExp('^(?=.*[a-z])');

    const schema = {
      title: Joi.string().min(3).max(50).regex(validInput)
        .required()
        .error(() => ({
          message: 'title should have a letter and minimum of 3 characters',
        })),
      article: Joi.string().min(50).regex(validInput)
        .required()
        .error(() => ({
          message: 'article should have a letter and minimum of 50 characters',
        })),
    };

    return Joi.validate(req, schema);
  }

  static checkToken(req, res, next) {
    const token = req.header('authorization');
    if (!token) {
      res.status(401).json({
        status: 401,
        message: 'please provide token',
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded;
      next();
    } catch (ex) {
      res.status(401).json({
        status: 401,
        message: 'unauthorised to use this resource, please signup/login',
      });
    }
  }
}

export default Validation;
