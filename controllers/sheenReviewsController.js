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
    userID: res.locals.user.user_id,
    writingSampleID: req.body.writingSampleID,
    color: req.body.color,
    amount: req.body.amount,
  };

  try {
    await sheenReviewsModel.remove(sheenReview);
  } catch (e) {
    next(e);
  }

  try {
    const data = await sheenReviewsModel.insert(sheenReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const sheenReview = {
    writingSampleID: req.params.writingSampleID,
    userID: res.locals.user.user_id,
  };

  if (res.locals.user.level === 'admin' && req.body.userID !== undefined) {
    sheenReview.userID = req.body.userID;
  }

  try {
    const data = await sheenReviewsModel.remove(sheenReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const colorReview = {
    userID: req.body.userID,
    writingSampleID: req.body.writingSampleID,
    approved: req.body.approved,
  };

  try {
    const data = await sheenReviewsModel.update(colorReview);
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
