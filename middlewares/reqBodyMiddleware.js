const createError = require('http-errors');

const sanitizeReqBody = (req, res, next) => {
  if (req.body.userID !== undefined && res.locals.user.level !== 'admin') {
    return next(createError(403, 'Forbidden. Only admins can set user id.'));
  }

  if (req.body.approved !== undefined && res.locals.user.level !== 'admin') {
    return next(createError(403, 'Forbidden. Only admins can set approved.'));
  }

  return next();
};

module.exports = {
  sanitizeReqBody,
};
