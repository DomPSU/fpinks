const createError = require('http-errors');
const { show } = require('../models/sheenReviewsModel');

const setSheenReview = (req, res, next) => {
  const userID = req.body.userID ? req.body.userID : res.locals.user.user_id;

  const writingSampleID = req.body.writingSampleID
    ? req.body.writingSampleID
    : req.params.writingSampleID;

  res.locals.sheenReview = {
    userID,
    writingSampleID,
    colorID: req.body.colorID,
    amount: req.body.amount,
    color: req.body.color,
    approved: req.body.approved,
  };

  return next();
};

const setPriorSheenReview = async (req, res, next) => {
  try {
    res.locals.priorSheenReview = await show(res.locals.sheenReview);
  } catch (err) {
    return next(err);
  }

  return next();
};

const noPriorSheenReview = (req, res, next) => {
  if (res.locals.priorSheenReview.length === 0) {
    return next();
  }

  return next(createError(400, 'A prior Sheen Review exists.'));
};

const priorSheenReviewExists = (req, res, next) => {
  if (res.locals.priorSheenReview.length === 1) {
    return next();
  }

  return next(createError(404, 'Sheen Review not found.'));
};

module.exports = {
  setSheenReview,
  setPriorSheenReview,
  noPriorSheenReview,
  priorSheenReviewExists,
};
