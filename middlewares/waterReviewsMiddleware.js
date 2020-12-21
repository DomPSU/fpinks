const createError = require('http-errors');
const { show } = require('../models/waterReviewsModel');

const setWaterReview = (req, res, next) => {
  const userID = req.body.userID ? req.body.userID : res.locals.user.user_id;

  const writingSampleID = req.body.writingSampleID
    ? req.body.writingSampleID
    : req.params.writingSampleID;

  res.locals.waterReview = {
    userID,
    writingSampleID,
    waterproofness: req.body.waterproofness,
    approved: req.body.approved,
  };

  return next();
};

const setPriorWaterReview = async (req, res, next) => {
  try {
    res.locals.priorWaterReview = await show(res.locals.waterReview);
  } catch (err) {
    return next(err);
  }

  return next();
};

const noPriorWaterReview = (req, res, next) => {
  if (res.locals.priorWaterReview.length === 0) {
    return next();
  }

  return next(createError(400, 'A prior Waterproofness Review exists.'));
};

const priorWaterReviewExists = (req, res, next) => {
  if (res.locals.priorWaterReview.length === 1) {
    return next();
  }

  return next(createError(404, 'Waterproofness Review not found.'));
};

module.exports = {
  setWaterReview,
  setPriorWaterReview,
  noPriorWaterReview,
  priorWaterReviewExists,
};
