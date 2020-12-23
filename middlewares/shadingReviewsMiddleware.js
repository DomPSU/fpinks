const createError = require('http-errors');
const { show } = require('../models/shadingReviewsModel');
const { amounts } = require('../constants');

const validateShadingReview = (req, res, next) => {
  const { amount } = req.body;

  if (amount !== undefined) {
    if (typeof amount !== 'string') {
      return next(createError(400, 'Amount must be a string.'));
    }

    if (!amounts.includes(amount.toLowerCase())) {
      return next(
        createError(
          400,
          `Amount must equal one of the following non case-sensitive choices: ${amounts.join(
            ', ',
          )}.`,
        ),
      );
    }
  }

  next();
};

const setShadingReview = (req, res, next) => {
  const userID = req.body.userID ? req.body.userID : res.locals.user.user_id;

  const writingSampleID = req.body.writingSampleID
    ? req.body.writingSampleID
    : req.params.writingSampleID;

  res.locals.shadingReview = {
    userID,
    writingSampleID,
    amount: req.body.amount,
    approved: req.body.approved,
  };

  return next();
};

const setPriorShadingReview = async (req, res, next) => {
  try {
    res.locals.priorShadingReview = await show(res.locals.shadingReview);
  } catch (err) {
    return next(err);
  }

  return next();
};

const noPriorShadingReview = (req, res, next) => {
  const { priorShadingReview } = res.locals;

  if (priorShadingReview.length === 0) {
    return next();
  }

  return next(createError(400, 'A prior Shading Review exists.'));
};

const priorShadingReviewExists = (req, res, next) => {
  const { priorShadingReview } = res.locals;

  if (priorShadingReview.length === 1) {
    return next();
  }

  return next(createError(404, 'Shading Review not found.'));
};

module.exports = {
  validateShadingReview,
  setShadingReview,
  setPriorShadingReview,
  noPriorShadingReview,
  priorShadingReviewExists,
};
