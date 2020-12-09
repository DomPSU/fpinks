const sheenReviewsModel = require('../models/sheenReviewsModel');

const index = async (req, res, next) => {
  const queryKeys = res.locals.queryKeys || [];
  const queryValues = res.locals.queryValues || [];

  try {
    const data = await sheenReviewsModel.index(queryKeys, queryValues);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const adminIndex = async (req, res, next) => {
  const queryKeys = res.locals.queryKeys || [];
  const queryValues = res.locals.queryValues || [];

  try {
    const data = await sheenReviewsModel.adminIndex(queryKeys, queryValues);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const sheenReview = {
    ...req.body,
  };

  // delete existing sheen review for user and writing sample
  try {
    await sheenReviewsModel.remove(sheenReview);
  } catch (e) {
    next(e);
  }

  // insert new sheen review
  try {
    const data = await sheenReviewsModel.insert(sheenReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const sheenReview = {
    ...req.body,
  };

  try {
    const data = await sheenReviewsModel.remove(sheenReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};
module.exports = {
  index,
  adminIndex,
  insert,
  remove,
};
