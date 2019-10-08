/* eslint-disable func-names */
/* eslint-disable consistent-return */
import validation from '../../middleware/validation';

class Rules {
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
}

export default Rules;
