const transparencyReviewsModel = require('../models/transparencyReviewsModel');

const show = async (req, res, next) => {
  try {
    const transparencyReview = await transparencyReviewsModel.show(
      res.locals.transparencyReview,
    );

    res.status(200).send(transparencyReview);
  } catch (err) {
    return next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const transparencyReviews = await transparencyReviewsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );

    res.status(200).send(transparencyReviews);
  } catch (err) {
    return next(err);
  }
};

const insert = async (req, res, next) => {
  try {
    const transparencyReview = await transparencyReviewsModel.insert(
      res.locals.transparencyReview,
    );

    res.statusMessage = 'Transparency Review creation succesful.';
    res.status(201).send(transparencyReview);
  } catch (err) {
    return next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await transparencyReviewsModel.remove(res.locals.transparencyReview);

    res.statusMessage = 'Transparency Review deletion succesful.';
    res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const transparencyReview = await transparencyReviewsModel.update(
      res.locals.transparencyReview,
    );

    res.statusMessage = 'Transparency Review update succesful.';
    res.status(200).send(transparencyReview);
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
