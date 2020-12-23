const createError = require('http-errors');
const { show } = require('../models/featheringReviewsModel');
const { amounts } = require('../constants');

const validateFeatheringReview = (req, res, next) => {
  if (req.body.amount !== undefined) {
    if (typeof req.body.amount !== 'string') {
      return next(createError(400, 'Amount must be a string.'));
    }

    if (!amounts.includes(req.body.amount.toLowerCase())) {
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

const setFeatheringReview = (req, res, next) => {
  const userID = req.body.userID ? req.body.userID : res.locals.user.user_id;

  const writingSampleID = req.body.writingSampleID
    ? req.body.writingSampleID
    : req.params.writingSampleID;

  res.locals.featheringReview = {
    userID,
    writingSampleID,
    amount: req.body.amount,
    approved: req.body.approved,
  };

  return next();
};

const setPriorFeatheringReview = async (req, res, next) => {
  try {
    res.locals.priorFeatheringReview = await show(res.locals.featheringReview);
  } catch (err) {
    return next(err);
  }

  return next();
};

const noPriorFeatheringReview = (req, res, next) => {
  if (res.locals.priorFeatheringReview.length === 0) {
    return next();
  }

  return next(createError(400, 'A prior Feathering Review exists.'));
};

const priorFeatheringReviewExists = (req, res, next) => {
  if (res.locals.priorFeatheringReview.length === 1) {
    return next();
  }

  return next(createError(404, 'Feathering Review not found.'));
};

module.exports = {
  validateFeatheringReview,
  setFeatheringReview,
  setPriorFeatheringReview,
  noPriorFeatheringReview,
  priorFeatheringReviewExists,
};
