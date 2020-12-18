const featheringReviewsModel = require('../models/featheringReviewsModel');

const index = async (req, res, next) => {
  try {
    const data = await featheringReviewsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const featheringReview = {
    userID: res.locals.user.user_id,
    writingSampleID: req.body.writingSampleID,
    amount: req.body.amount,
  };

  try {
    await featheringReviewsModel.remove(featheringReview);
  } catch (e) {
    next(e);
  }

  try {
    const data = await featheringReviewsModel.insert(featheringReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const featheringReview = {
    userID: res.locals.user.user_id,
    writingSampleID: req.params.writingSampleID,
  };

  if (res.locals.user.level === 'admin' && req.body.userID !== undefined) {
    featheringReview.userID = req.body.userID;
  }

  try {
    const data = await featheringReviewsModel.remove(featheringReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const featheringReview = {
    userID: req.body.userID,
    writingSampleID: req.body.writingSampleID,
    approved: req.body.approved,
  };

  try {
    const data = await featheringReviewsModel.update(featheringReview);
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
