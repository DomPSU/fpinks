const createError = require('http-errors');

const forbiddenQueryStringKeys = [
  'sub',
  'iss',
  'email',
  'level',
  'users.sub',
  'users.iss',
  'users.email',
  'users.level',
];

const sanitizeQueryString = (req, res, next) => {
  const queryKeys = Object.keys(req.query);
  const queryValues = Object.values(req.query);

  try {
    for (let i = 0; i < queryKeys.length; i += 1) {
      if (forbiddenQueryStringKeys.includes(queryKeys[i].toLowerCase())) {
        throw new Error();
      }
    }
  } catch (e) {
    return next(createError(403, 'Forbidden query string key.'));
  }

  res.locals.queryKeys = queryKeys;
  res.locals.queryValues = queryValues;

  next();
};

module.exports = {
  sanitizeQueryString,
};
