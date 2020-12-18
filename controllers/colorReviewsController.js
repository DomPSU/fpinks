const colorReviewsModel = require('../models/colorReviewsModel');

const index = async (req, res, next) => {
  try {
    const data = await colorReviewsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  // TOOD validate 2 or less color reviews exist

  const colorReview = {
    userID: res.locals.user.user_id,
    writingSampleID: req.body.writingSampleID,
    color: req.body.color,
  };

  try {
    const data = await colorReviewsModel.insert(colorReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const colorReview = {
    userID: res.locals.user.user_id,
    writingSampleID: req.params.writingSampleID,
    colorID: req.params.colorID,
  };

  if (res.locals.user.level === 'admin' && req.body.userID !== undefined) {
    colorReview.userID = req.body.userID;
  }

  try {
    const data = await colorReviewsModel.remove(colorReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const colorReview = {
    userID: req.body.userID,
    writingSampleID: req.body.writingSampleID,
    colorID: req.body.colorID,
    approved: req.body.approved,
  };

  try {
    const data = await colorReviewsModel.update(colorReview);
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
