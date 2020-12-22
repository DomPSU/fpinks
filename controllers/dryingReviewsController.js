const dryingReviewsModel = require('../models/dryingReviewsModel');

const show = async (req, res, next) => {
  try {
    const dryingReview = await dryingReviewsModel.show(res.locals.dryingReview);

    res.status(200).send(dryingReview);
  } catch (err) {
    return next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const dryingReviews = await dryingReviewsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );

    res.status(200).send(dryingReviews);
  } catch (err) {
    return next(err);
  }
};

const insert = async (req, res, next) => {
  try {
    const dryingReview = await dryingReviewsModel.insert(
      res.locals.dryingReview,
    );

    res.statusMessage = 'Drying Time Review creation succesful.';
    res.status(201).send(dryingReview);
  } catch (err) {
    return next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await dryingReviewsModel.remove(res.locals.dryingReview);

    res.statusMessage = 'Drying Time Review deletion succesful.';
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const dryingReview = await dryingReviewsModel.update(
      res.locals.dryingReview,
    );

    res.statusMessage = 'Drying Time Review deletion succesful.';
    res.status(200).send(dryingReview);
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
