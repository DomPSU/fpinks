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
    userID: res.locals.user.user_id,
    writingSampleID: req.body.writingSampleID,
    dryingTime: req.body.dryingTime,
  };

  try {
    await dryingReviewsModel.remove(dryingReview);
  } catch (e) {
    next(e);
  }

  try {
    const data = await dryingReviewsModel.insert(dryingReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const dryingReview = {
    userID: res.locals.user.user_id,
    writingSampleID: req.params.writingSampleID,
  };

  if (res.locals.user.level === 'admin' && req.body.userID !== undefined) {
    dryingReview.userID = req.body.userID;
  }

  try {
    const data = await dryingReviewsModel.remove(dryingReview);
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
