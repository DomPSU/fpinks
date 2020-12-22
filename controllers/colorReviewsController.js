const colorReviewsModel = require('../models/colorReviewsModel');

const show = async (req, res, next) => {
  try {
    const colorReviews = await colorReviewsModel.show(res.locals.colorReview);

    res.status(200).send(colorReviews);
  } catch (err) {
    return next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const data = await colorReviewsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );

    res.status(200).send(data);
  } catch (err) {
    return next(err);
  }
};

const insert = async (req, res, next) => {
  try {
    const colorReview = await colorReviewsModel.insert(res.locals.colorReview);

    res.statusMessage = 'Color Review creation succesful.';
    res.status(201).send(colorReview);
  } catch (err) {
    return next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await colorReviewsModel.remove(res.locals.colorReview);

    res.statusMessage = 'Color Review deletions succesful.';
    res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const colorReview = await colorReviewsModel.update(res.locals.colorReview);

    res.statusMessage = 'Color Review update succesful.';
    res.status(200).send(colorReview);
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
