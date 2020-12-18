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

const getApprovedKeyFromPath = (originalURL) => {
  let path = originalURL.replace('/api/', '');

  if (path.indexOf('?') > -1) {
    path = path.substring(0, path.indexOf('?') - 1);
  }

  if (
    path === 'users' ||
    path === 'pens' ||
    path === 'inks' ||
    path === 'papers' ||
    path === 'nibs'
  ) {
    return 'approved';
  }

  if (path === 'pen-nibs') {
    return 'PenNibs.approved';
  }

  if (path === 'color-reviews') {
    return 'ColorReviews.approved';
  }

  if (path === 'shading-reviews') {
    return 'ShadingReviews.approved';
  }

  if (path === 'sheen-reviews') {
    return 'SheenReviews.approved';
  }

  if (path === 'feathering-reviews') {
    return 'FeatheringReviews.approved';
  }

  if (path === 'water-reviews') {
    return 'WaterReviews.approved';
  }

  if (path === 'drying-reviews') {
    return 'DryingReviews.approved';
  }

  if (path === 'transparency-reviews') {
    return 'TransparencyReviews.approved';
  }

  if (
    path === 'writing-samples' ||
    path === 'writing-samples/search' ||
    path === 'writing-samples/search/'
  ) {
    return 'WritingSamples.approved';
  }

  // TODO throw error if no match?
};

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

  next();
};

const processQueryString = (req, res, next) => {
  const queryKeys = Object.keys(req.query);
  const queryValues = Object.values(req.query);

  const offsetIndex = queryKeys.indexOf('offset');

  if (offsetIndex > -1) {
    res.locals.offset = queryValues[offsetIndex];

    queryKeys.splice(offsetIndex, 1);
    queryValues.splice(offsetIndex, 1);
  } else {
    res.locals.offset = 0;
  }

  if (res.locals.user === undefined || res.locals.user.level !== 'admin') {
    queryKeys.push(getApprovedKeyFromPath(req.originalUrl));
    queryValues.push('1');
  }

  res.locals.processedQueryKeys = queryKeys;
  res.locals.processedQueryValues = queryValues;

  next();
};

const appendUserToQS = (req, res, next) => {
  res.locals.processedQueryKeys.push('Users.user_id');
  res.locals.processedQueryValues.push(res.locals.user.user_id);

  next();
};

const appendWritingSampleToQS = (req, res, next) => {
  res.locals.processedQueryKeys.push('writing_sample_id');
  res.locals.processedQueryValues.push(req.params.writing_sample_id);

  next();
};

module.exports = {
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
};
