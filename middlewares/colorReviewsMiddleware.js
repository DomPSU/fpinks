const createError = require('http-errors');
const { show } = require('../models/colorReviewsModel');
const { colors } = require('../constants');

const validateColorReview = (req, res, next) => {
  const { color } = req.body;

  if (color !== undefined) {
    if (typeof color !== 'string') {
      return next(createError(400, 'Amount must be a string.'));
    }

    if (!colors.includes(color.toLowerCase())) {
      return next(
        createError(
          400,
          `Color must equal one of the following non case-sensitive choices: ${colors.join(
            ', ',
          )}.`,
        ),
      );
    }
  }

  next();
};

const setColorReview = (req, res, next) => {
  const userID = req.body.userID ? req.body.userID : res.locals.user.user_id;

  const writingSampleID = req.body.writingSampleID
    ? req.body.writingSampleID
    : req.params.writingSampleID;

  res.locals.colorReview = {
    userID,
    writingSampleID,
    colorID: req.body.colorID,
    color: req.body.color,
    approved: req.body.approved,
  };

  return next();
};

const setPriorColorReviews = async (req, res, next) => {
  try {
    res.locals.priorColorReviews = await show(res.locals.colorReview);
  } catch (err) {
    return next(err);
  }

  return next();
};

const noMaxPriorColorReviews = (req, res, next) => {
  if (res.locals.priorColorReviews.length < 3) {
    return next();
  }

  return next(createError(400, 'At least one prior Color Review exists.'));
};

const priorColorReviewsExists = (req, res, next) => {
  if (
    res.locals.priorColorReviews.length === 1 ||
    res.locals.priorColorReviews.length === 2 ||
    res.locals.priorColorReviews.length === 3
  ) {
    return next();
  }

  return next(createError(404, 'Color Reviews not found.'));
};

module.exports = {
  validateColorReview,
  setColorReview,
  setPriorColorReviews,
  noMaxPriorColorReviews,
  priorColorReviewsExists,
};
