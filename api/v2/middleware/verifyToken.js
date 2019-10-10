/* eslint-disable consistent-return */
import ENV from 'dotenv';
import jwt from 'jsonwebtoken';

ENV.config();

const CheckToken = {
  /**
   * @method Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */

  verifyToken(req, res, next) {
    const token = req.header('authorization');
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: 'please provide token',
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.user = decoded;
      next();
    } catch (ex) {
      return res.status(401).json({
        status: 401,
        message: 'unauthorised to use this resource, please signup/login',
      });
    }
  },
};

export default CheckToken;
