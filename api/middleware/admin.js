/* eslint-disable func-names */
/* eslint-disable consistent-return */

module.exports = function (req, res, next) {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      status: 403,
      message: 'cant access this resource',
    });
  }
  next();
};
