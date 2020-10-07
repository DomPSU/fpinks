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

const sanitizeQueryString = async (req, res, next) => {
  // get validated user from id token
  try {
    const queryKeys = Object.keys(req.query);
    const queryValues = Object.values(req.query);

    for (let i = 0; i < queryKeys.length; i += 1) {
      if (forbiddenQueryStringKeys.includes(queryKeys[i].toLowerCase())) {
        throw new Error();
      }
    }

    res.locals.queryKeys = queryKeys;
    res.locals.queryValues = queryValues;
    next();
  } catch (e) {
    console.log('403 forbidden string query key.');
    res.status(403).end();
  }
};

module.exports = {
  sanitizeQueryString,
};
