const featheringReviewsModel = require('../models/featheringReviewsModel');

const show = async (req, res, next) => {
  try {
    const featheringReview = await featheringReviewsModel.show(
      res.locals.featheringReview,
    );

    res.status(200).send(featheringReview);
  } catch (err) {
    return next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const featheringReviews = await featheringReviewsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );

    res.status(200).send(featheringReviews);
  } catch (err) {
    return next(err);
  }
};

const insert = async (req, res, next) => {
  try {
    const featheringReview = await featheringReviewsModel.insert(
      res.locals.featheringReview,
    );

    res.statusMessage = 'FeatheringReview creation succesful.';
    res.status(201).send(featheringReview);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await featheringReviewsModel.remove(res.locals.featheringReview);

    res.statusMessage = 'Feathering Review deletion succesful.';
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const featheringReview = await featheringReviewsModel.update(
      res.locals.featheringReview,
    );
    res.statusMessage = 'Feathering Review update succesful.';
    res.status(200).send(featheringReview);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  show,
  index,
  insert,
  remove,
  update,
};
