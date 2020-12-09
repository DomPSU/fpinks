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

const getApprovedKeyFromPath = (originalUrl) => {
  const path = originalUrl.substring(5); // trim '/api'

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

  if (path === 'writing-samples') {
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

  res.locals.queryKeys = queryKeys;
  res.locals.queryValues = queryValues;

  next();
};

const processQueryString = (req, res, next) => {
  const queryKeys = res.locals.queryKeys || [];
  const queryValues = res.locals.queryValues || [];

  if (res.locals.user === undefined || res.locals.user.level !== 'admin') {
    queryKeys.push(getApprovedKeyFromPath(req.originalUrl));
    queryValues.push('1');
  }

  res.locals.processedQueryKeys = queryKeys;
  res.locals.processedQueryValues = queryValues;

  next();
};

module.exports = {
  sanitizeQueryString,
  processQueryString,
};
