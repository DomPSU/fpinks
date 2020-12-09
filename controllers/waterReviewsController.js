const waterReviewsModel = require('../models/waterReviewsModel');

const index = async (req, res, next) => {
  const queryKeys = res.locals.queryKeys || [];
  const queryValues = res.locals.queryValues || [];

  try {
    const data = await waterReviewsModel.index(queryKeys, queryValues);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const adminIndex = async (req, res, next) => {
  const queryKeys = res.locals.queryKeys || [];
  const queryValues = res.locals.queryValues || [];

  try {
    const data = await waterReviewsModel.adminIndex(queryKeys, queryValues);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const waterReview = {
    ...req.body,
  };

  // delete existing waterproofness review for user and writing sample
  try {
    await waterReviewsModel.remove(waterReview);
  } catch (e) {
    next(e);
  }

  // insert new waterproofness review
  try {
    const data = await waterReviewsModel.insert(waterReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const waterReview = {
    ...req.body,
  };

  try {
    const data = await waterReviewsModel.remove(waterReview);
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
