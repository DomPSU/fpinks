const shadingReviewsModel = require('../models/shadingReviewsModel');

const index = async (req, res, next) => {
  try {
    const data = await shadingReviewsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const shadingReview = {
    userID: res.locals.user.user_id,
    writingSampleID: req.body.writingSampleID,
    amount: req.body.amount,
  };

  try {
    await shadingReviewsModel.remove(shadingReview);
  } catch (e) {
    next(e);
  }

  try {
    const data = await shadingReviewsModel.insert(shadingReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const shadingReview = {
    writingSampleID: req.params.writingSampleID,
    userID: res.locals.user.user_id,
  };

  if (res.locals.user.level === 'admin' && req.body.userID !== undefined) {
    shadingReview.userID = req.body.userID;
  }

  try {
    const data = await shadingReviewsModel.remove(shadingReview);
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
    const data = await shadingReviewsModel.update(shadingReview);
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
