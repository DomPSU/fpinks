const createError = require('http-errors');
const { show } = require('../models/transparencyReviewsModel');
const { transparencies } = require('../constants');

const validateTransparencyReview = (req, res, next) => {
  if (req.body.transparency !== undefined) {
    if (typeof req.body.transparency !== 'string') {
      return next(createError(400, 'Amount must be a string.'));
    }

    if (!transparencies.includes(req.body.transparency.toLowerCase())) {
      return next(
        createError(
          400,
          `Transpaerency must equal one of the following non case-sensitive choices: ${transparencies.join(
            ', ',
          )}.`,
        ),
      );
    }
  }

  next();
};

const setTransparencyReview = (req, res, next) => {
  const userID = req.body.userID ? req.body.userID : res.locals.user.user_id;

  const writingSampleID = req.body.writingSampleID
    ? req.body.writingSampleID
    : req.params.writingSampleID;

  res.locals.transparencyReview = {
    userID,
    writingSampleID,
    transparency: req.body.transparency,
    approved: req.body.approved,
  };

  return next();
};

const setPriorTransparencyReview = async (req, res, next) => {
  try {
    res.locals.priorTransparencyReview = await show(
      res.locals.transparencyReview,
    );
  } catch (err) {
    return next(err);
  }

  return next();
};

const noPriorTransparencyReview = (req, res, next) => {
  if (res.locals.priorTransparencyReview.length === 0) {
    return next();
  }

  return next(createError(400, 'A prior Transparency Review exists.'));
};

const priorTransparencyReviewExists = (req, res, next) => {
  if (res.locals.priorTransparencyReview.length === 1) {
    return next();
  }

  return next(createError(404, 'Transparency Review not found.'));
};

module.exports = {
  validateTransparencyReview,
  setTransparencyReview,
  setPriorTransparencyReview,
  noPriorTransparencyReview,
  priorTransparencyReviewExists,
};
