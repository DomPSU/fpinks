const sheenReviewsModel = require('../models/sheenReviewsModel');

const show = async (req, res, next) => {
  try {
    const sheenReview = await sheenReviewsModel.show(res.locals.sheenReview);

    res.status(200).send(sheenReview);
  } catch (err) {
    return next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const sheenReviews = await sheenReviewsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );

    res.status(200).send(sheenReviews);
  } catch (err) {
    next(err);
  }
};

const insert = async (req, res, next) => {
  try {
    const sheenReview = await sheenReviewsModel.insert(res.locals.sheenReview);

    res.statusMessage = 'Sheen Review creation succesful.';
    res.status(201).send(sheenReview);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await sheenReviewsModel.remove(res.locals.sheenReview);

    res.statusMessage = 'Sheen Review deletion succesful.';
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const sheenReview = await sheenReviewsModel.update(res.locals.sheenReview);

    res.statusMessage = 'Sheen Review update succesful.';
    res.status(200).send(sheenReview);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  show,
  index,
  insert,
  remove,
  update,
};
