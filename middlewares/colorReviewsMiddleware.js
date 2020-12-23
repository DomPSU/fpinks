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

const underMaxPriorColorReviews = (req, res, next) => {
  const { priorColorReviews } = res.locals;

  if (priorColorReviews.length < 3) {
    return next();
  }

  return next(createError(400, 'Maximum number of Color Review exist.'));
};

const priorColorReviewsExists = (req, res, next) => {
  const { priorColorReviews } = res.locals;

  if (
    priorColorReviews.length === 1 ||
    priorColorReviews.length === 2 ||
    priorColorReviews.length === 3
  ) {
    return next();
  }

  return next(createError(404, 'Color Reviews not found.'));
};

const noNoneColorReviewConflict = (req, res, next) => {
  const { colorReview, priorColorReviews } = res.locals;

  if (priorColorReviews.length === 1) {
    if (priorColorReviews[0].color === 'none') {
      return next(
        createError(
          400,
          "Another Color Review cannot exist with a 'none' Color Review.",
        ),
      );
    }
  }

  if (priorColorReviews.length > 0) {
    if (colorReview.color.toLowerCase() === 'none') {
      return next(
        createError(
          400,
          "A Color Review choice of 'none' cannot exist with other color reviews.",
        ),
      );
    }
  }

  next();
};

module.exports = {
  validateColorReview,
  setColorReview,
  setPriorColorReviews,
  underMaxPriorColorReviews,
  priorColorReviewsExists,
  noNoneColorReviewConflict,
};
