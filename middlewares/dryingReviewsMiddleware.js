const createError = require('http-errors');
const { show } = require('../models/dryingReviewsModel');
const { dryingTimes } = require('../constants');

const validateDryingReview = (req, res, next) => {
  if (req.body.dryingTime !== undefined) {
    if (typeof req.body.dryingTime !== 'string') {
      return next(createError(400, 'Drying Time must be a string.'));
    }

    if (!dryingTimes.includes(req.body.dryingTime.toLowerCase())) {
      return next(
        createError(
          400,
          `Drying Time must equal one of the following non case-sensitive choices: ${dryingTimes.join(
            ', ',
          )}.`,
        ),
      );
    }
  }

  next();
};

const setDryingReview = (req, res, next) => {
  const userID = req.body.userID ? req.body.userID : res.locals.user.user_id;

  const writingSampleID = req.body.writingSampleID
    ? req.body.writingSampleID
    : req.params.writingSampleID;

  res.locals.dryingReview = {
    userID,
    writingSampleID,
    dryingTime: req.body.dryingTime,
    approved: req.body.approved,
  };

  return next();
};

const setPriorDryingReview = async (req, res, next) => {
  try {
    res.locals.priorDryingReview = await show(res.locals.dryingReview);
  } catch (err) {
    return next(err);
  }

  return next();
};

const noPriorDryingReview = (req, res, next) => {
  if (res.locals.priorDryingReview.length === 0) {
    return next();
  }

  return next(createError(400, 'A prior Drying Time Review exists.'));
};

const priorDryingReviewExists = (req, res, next) => {
  if (res.locals.priorDryingReview.length === 1) {
    return next();
  }

  return next(createError(404, 'Drying Time Review not found.'));
};

module.exports = {
  validateDryingReview,
  setDryingReview,
  setPriorDryingReview,
  noPriorDryingReview,
  priorDryingReviewExists,
};
