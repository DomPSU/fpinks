const shadingReviewsModel = require('../models/shadingReviewsModel');

const show = async (req, res, next) => {
  try {
    const shadingReview = await shadingReviewsModel.show(
      res.locals.shadingReview,
    );

    res.status(200).send(shadingReview);
  } catch (err) {
    return next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const shadingReviews = await shadingReviewsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );

    res.status(200).send(shadingReviews);
  } catch (err) {
    return next(err);
  }
};

const insert = async (req, res, next) => {
  try {
    const shadingReview = await shadingReviewsModel.insert(
      res.locals.shadingReview,
    );

    res.statusMessage = 'Shading Review creation succesful.';
    res.status(201).send(shadingReview);
  } catch (err) {
    return next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await shadingReviewsModel.remove(res.locals.shadingReview);

    res.statusMessage = 'Shading Review deletion succesful.';
    res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const shadingReview = await shadingReviewsModel.update(
      res.locals.shadingReview,
    );

    res.statusMessage = 'Shading Review update succesful.';
    res.status(200).send(shadingReview);
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
