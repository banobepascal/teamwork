/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/**
 *eslint-disable class-methods-use-this
 * eslint-disable func-names
 * eslint-disable consistent-return
 */
import bcrypt from 'bcrypt';
import ENV from 'dotenv';
import jwt from 'jsonwebtoken';
import validation from '../../middleware/validation';
import client from './dbConnection';

ENV.config();

class Helpers {
  /**
   * @method hashPassword
   * @description generates a salt and hashes password sent by the use
   * @param {string} password
   * @returns {string} returns hashed password
   */

  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
   * @method comparePassword
   * @description matches given password with email entered by the user
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  /**
   * @method authRules
   * @description provides error message on invalid signup
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} relevant error message
   */

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

  /**
   * @method articleRules
   * @description verifys article data being sent by the user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} relevant error message
   */

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

  /**
   * @method flagRules
   * @description verifys flag being sent by the user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} relevant error message
   */

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
   * @method commentRules
   * @description verifys comment data being sent by the user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} relevant error message
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
    const token = jwt.sign({ userId: id }, process.env.JWT_KEY, {
      expiresIn: '1d',
    });
    return token;
  }

  static async getArticleId(req, res, next) {
    client.query('SELECT * FROM articles where id = $1',
      [req.params.id], (err, results) => {
        if (err) {
          return res.status(400).json({
            status: 400,
            error: err.detail,
          });
        }
        if (results.rows < '1') {
          return res.status(400).json({
            status: 400,
            error: 'article does not exist',
          });
        }
        req.article = results.rows[0];
        next();
      });
  }
}

export default Helpers;
