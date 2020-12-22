const createError = require('http-errors');
const { show } = require('../models/dryingReviewsModel');

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
  setDryingReview,
  setPriorDryingReview,
  noPriorDryingReview,
  priorDryingReviewExists,
};
