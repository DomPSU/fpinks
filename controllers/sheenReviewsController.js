const sheenReviewsModel = require('../models/sheenReviewsModel');

const index = async (req, res, next) => {
  try {
    const data = await sheenReviewsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const sheenReview = {
    ...req.body,
  };

  // delete existing sheen review for user and writing sample
  try {
    await sheenReviewsModel.remove(sheenReview);
  } catch (e) {
    next(e);
  }

  // insert new sheen review
  try {
    const data = await sheenReviewsModel.insert(sheenReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const sheenReview = {
    ...req.body,
  };

  try {
    const data = await sheenReviewsModel.remove(sheenReview);
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
