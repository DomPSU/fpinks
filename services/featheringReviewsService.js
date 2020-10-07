const featheringReviewsModel = require('../models/featheringReviewsModel');

const index = async (req, res, next) => {
  const queryKeys = res.locals.queryKeys || [];
  const queryValues = res.locals.queryValues || [];

  try {
    const data = await featheringReviewsModel.index(queryKeys, queryValues);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const adminIndex = async (req, res, next) => {
  const queryKeys = res.locals.queryKeys || [];
  const queryValues = res.locals.queryValues || [];

  try {
    const data = await featheringReviewsModel.adminIndex(
      queryKeys,
      queryValues,
    );
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const featheringReview = {
    ...req.body,
  };

  // delete existing feathering review for user and writing sample
  try {
    await featheringReviewsModel.remove(featheringReview);
  } catch (e) {
    next(e);
  }

  // insert new feathering review
  try {
    const data = await featheringReviewsModel.insert(featheringReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const featheringReview = {
    ...req.body,
  };

  try {
    const data = await featheringReviewsModel.remove(featheringReview);
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
