/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import ENV from 'dotenv';
import jwt from 'jsonwebtoken';
import validation from '../../middleware/validation';

ENV.config();

class Rules {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */

  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static authRules(req, res, next) {
    const { error } = validation.validateUserSignUp(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/[/"]/g, ''),
      });
    }
    next();
  }

  static articleRules(req, res, next) {
    const { error } = validation.validateArticle(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/[/"]/g, ''),
      });
    }
    next();
  }

  static flagRules(req, res, next) {
    const { error } = validation.validateFlag(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/[/"]/g, ''),
      });
    }
    next();
  }

  /**
   * @description Validating comment sent
   * @param {string} id
   * @returns {object} with the comment
   */

  static commentRules(req, res, next) {
    const { error } = validation.validateComment(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message.replace(/[/"]/g, ''),
      });
    }
    next();
  }

  /**
   * @description Generate token
   * @param {string} id
   * @returns {string} token
   */
  static generateToken(id) {
    const token = jwt.sign({ userId: id },
      process.env.JWT_KEY, { expiresIn: '1d' });
    return token;
  }
}

export default Rules;
