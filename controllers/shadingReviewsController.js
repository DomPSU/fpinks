const shadingReviewsModel = require('../models/shadingReviewsModel');

const index = async (req, res, next) => {
  try {
    const data = await shadingReviewsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const shadingReview = {
    ...req.body,
  };

  // delete existing shading review for user and writing sample
  try {
    await shadingReviewsModel.remove(shadingReview);
  } catch (e) {
    next(e);
  }

  // insert new shading review
  try {
    const data = await shadingReviewsModel.insert(shadingReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const shadingReview = {
    ...req.body,
  };

  try {
    const data = await shadingReviewsModel.remove(shadingReview);
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
