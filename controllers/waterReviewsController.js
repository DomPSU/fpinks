const waterReviewsModel = require('../models/waterReviewsModel');

const show = async (req, res, next) => {
  try {
    const waterReview = await waterReviewsModel.show(res.locals.waterReview);

    res.status(200).send(waterReview);
  } catch (err) {
    return next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const waterReviews = await waterReviewsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );

    res.status(200).send(waterReviews);
  } catch (err) {
    return next(err);
  }
};

const insert = async (req, res, next) => {
  try {
    const waterReview = await waterReviewsModel.insert(res.locals.waterReview);

    res.statusMessage = 'Waterproofness Review creation succesful.';
    res.status(201).send(waterReview);
  } catch (err) {
    return next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await waterReviewsModel.remove(res.locals.waterReview);

    res.statusMessage = 'Waterproofness Review deletion succesful.';
    res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const waterReview = await waterReviewsModel.update(res.locals.waterReview);
    res.statusMessage = 'Waterproofness Review update succesful.';
    res.status(200).send(waterReview);
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
