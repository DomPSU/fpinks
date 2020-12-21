const createError = require('http-errors');
const { show } = require('../models/shadingReviewsModel');

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
  if (res.locals.priorShadingReview.length === 0) {
    return next();
  }

  return next(createError(400, 'A prior Shading Review exists.'));
};

const priorShadingReviewExists = (req, res, next) => {
  if (res.locals.priorShadingReview.length === 1) {
    return next();
  }

  return next(createError(404, 'Shading Review not found.'));
};

module.exports = {
  setShadingReview,
  setPriorShadingReview,
  noPriorShadingReview,
  priorShadingReviewExists,
};
