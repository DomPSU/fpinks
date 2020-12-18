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
    userID: res.locals.user.user_id,
    writingSampleID: req.body.writingSampleID,
    waterproofness: req.body.waterproofness,
  };

  try {
    await waterReviewsModel.remove(waterReview);
  } catch (e) {
    next(e);
  }

  try {
    const data = await waterReviewsModel.insert(waterReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const waterReview = {
    userID: res.locals.user.user_id,
    writingSampleID: req.params.writingSampleID,
  };

  if (req.locals.user.level === 'admin' && req.body.userID !== undefined) {
    waterReview.userID = req.body.userID;
  }

  try {
    const data = await waterReviewsModel.remove(waterReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const shadingReview = {
    userID: req.body.userID,
    writingSampleID: req.body.writingSampleID,
    approved: req.body.approved,
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
  insert,
  remove,
  update,
};
