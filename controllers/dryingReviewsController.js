const dryingReviewsModel = require('../models/dryingReviewsModel');

const index = async (req, res, next) => {
  try {
    const data = await dryingReviewsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const dryingReview = {
    ...req.body,
    userID: res.locals.user.user_id,
  };

  // delete existing waterproofness review for user and writing sample
  try {
    await dryingReviewsModel.remove(dryingReview);
  } catch (e) {
    next(e);
  }

  // insert new waterproofness review
  try {
    const data = await dryingReviewsModel.insert(dryingReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const dryingReview = {
    ...req.body,
  };

  try {
    const data = await dryingReviewsModel.remove(dryingReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const shadingReview = {
    ...req.body,
  };

  try {
    const data = await dryingReviewsModel.update(shadingReview);
    res.statusMessage = 'Update succesful.';
    res.status(200).send(data);
  } catch (e) {
    res.status(400).end();
    next(e);
  }
};

module.exports = {
  index,
  insert,
  remove,
  update,
};
