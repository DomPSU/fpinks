const colorReviewsModel = require('../models/colorReviewsModel');

const index = async (req, res, next) => {
  let data;
  try {
    data = await colorReviewsModel.index();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  let data;
  const { writingSampleID } = req.params;

  try {
    data = await colorReviewsModel.show(writingSampleID);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const unapprovedIndex = async (req, res, next) => {
  let data;
  try {
    data = await colorReviewsModel.unapprovedIndex();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const colorReview = {
    ...req.body,
  };

  try {
    const data = await colorReviewsModel.insert(colorReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  index,
  unapprovedIndex,
  insert,
  show,
};