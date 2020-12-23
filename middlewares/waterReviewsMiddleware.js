const createError = require('http-errors');
const { show } = require('../models/waterReviewsModel');
const { waterproofnesses } = require('../constants');

const validateWaterReview = (req, res, next) => {
  const { waterproofness } = req.body;

  if (waterproofness !== undefined) {
    if (typeof waterproofness !== 'string') {
      return next(createError(400, 'Waterproofness must be a string.'));
    }

    if (!waterproofnesses.includes(waterproofness.toLowerCase())) {
      return next(
        createError(
          400,
          `Waterproofness must equal one of the following non case-sensitive choices: ${waterproofnesses.join(
            ', ',
          )}.`,
        ),
      );
    }
  }

  next();
};

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
  const { priorWaterReview } = res.locals;

  if (priorWaterReview.length === 0) {
    return next();
  }

  return next(createError(400, 'A prior Waterproofness Review exists.'));
};

const priorWaterReviewExists = (req, res, next) => {
  const { priorWaterReview } = res.locals;

  if (priorWaterReview.length === 1) {
    return next();
  }

  return next(createError(404, 'Waterproofness Review not found.'));
};

module.exports = {
  validateWaterReview,
  setWaterReview,
  setPriorWaterReview,
  noPriorWaterReview,
  priorWaterReviewExists,
};
