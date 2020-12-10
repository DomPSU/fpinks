const transparencyReviewsModel = require('../models/transparencyReviewsModel');

const index = async (req, res, next) => {
  try {
    const data = await transparencyReviewsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const transparencyReview = {
    ...req.body,
  };

  // delete existing transparency review for user and writing sample
  try {
    await transparencyReviewsModel.remove(transparencyReview);
  } catch (e) {
    next(e);
  }

  // insert new transparency review
  try {
    const data = await transparencyReviewsModel.insert(transparencyReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const transparencyReview = {
    ...req.body,
  };

  try {
    const data = await transparencyReviewsModel.remove(transparencyReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};
module.exports = {
  index,
  insert,
  remove,
};