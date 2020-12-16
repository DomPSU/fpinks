const waterReviewsModel = require('../models/waterReviewsModel');

const index = async (req, res, next) => {
  try {
    const data = await waterReviewsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const waterReview = {
    ...req.body,
    userID: res.locals.user.user_id,
  };

  // delete existing waterproofness review for user and writing sample
  try {
    await waterReviewsModel.remove(waterReview);
  } catch (e) {
    next(e);
  }

  // insert new waterproofness review
  try {
    const data = await waterReviewsModel.insert(waterReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  const data = {
    writingSampleID: req.params.writing_sample_id,
    userID: res.locals.user.user_id,
  };

  try {
    const dbRes = await waterReviewsModel.show(data);
    res.status(200).send(dbRes);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const waterReview = {
    ...req.body,
  };

  try {
    const data = await waterReviewsModel.remove(waterReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const shadingReview = {
    ...req.body,
    userID: res.locals.user.user_id,
  };

  try {
    const data = await waterReviewsModel.update(shadingReview);
    res.statusMessage = 'Update succesful.';
    res.status(200).send(data);
  } catch (e) {
    res.status(400).end();
    next(e);
  }
};

module.exports = {
  index,
  show,
  insert,
  remove,
  update,
};
