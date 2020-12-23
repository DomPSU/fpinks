const createError = require('http-errors');
const { show } = require('../models/sheenReviewsModel');
const { colors, amounts } = require('../constants');

const validateSheenReview = (req, res, next) => {
  const { color, amount } = req.body;

  let stringError = '';
  let choiceError = '';

  if (color !== undefined) {
    if (typeof color !== 'string') {
      stringError = stringError.concat('Color must be a string. ');
    }
  }

  if (amount !== undefined) {
    if (typeof amount !== 'string') {
      stringError = stringError.concat('Amount must be a string. ');
    }
  }

  if (stringError) {
    stringError = stringError.slice(0, -1);
    return next(createError(400, stringError));
  }

  if (color !== undefined) {
    if (!colors.includes(color.toLowerCase())) {
      choiceError = choiceError.concat(
        `Color must equal one of the following non case-sensitive choices: ${amounts.join(
          ', ',
        )}. `,
      );
    }
  }

  if (amount !== undefined) {
    if (!amounts.includes(amount.toLowerCase())) {
      choiceError = choiceError.concat(
        `Amount must equal one of the following non case-sensitive choices: ${amounts.join(
          ', ',
        )}. `,
      );
    }
  }

  if (choiceError) {
    choiceError = choiceError.slice(0, -1);
    return next(createError(400, choiceError));
  }

  if (color.toLowerCase() === 'none' && amount.toLowerCase() !== 'none') {
    return next(createError(400, 'If color is none, amount must be none.'));
  }

  if (color.toLowerCase() !== 'none' && amount.toLowerCase() === 'none') {
    return next(createError(400, 'If amount is none, color must be none.'));
  }

  next();
};

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
  const { priorSheenReview } = res.locals;

  if (priorSheenReview.length === 0) {
    return next();
  }

  return next(createError(400, 'A prior Sheen Review exists.'));
};

const priorSheenReviewExists = (req, res, next) => {
  const { priorSheenReview } = res.locals;

  if (priorSheenReview.length === 1) {
    return next();
  }

  return next(createError(404, 'Sheen Review not found.'));
};

module.exports = {
  validateSheenReview,
  setSheenReview,
  setPriorSheenReview,
  noPriorSheenReview,
  priorSheenReviewExists,
};
