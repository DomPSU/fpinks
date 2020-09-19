const dryingReviewsModel = require('../models/dryingReviewsModel');

const index = async (req, res, next) => {
  let data;
  try {
    data = await dryingReviewsModel.index();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  let data;
  const { writingSampleID } = req.params;

  try {
    data = await dryingReviewsModel.show(writingSampleID);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const unapprovedIndex = async (req, res, next) => {
  let data;
  try {
    data = await dryingReviewsModel.unapprovedIndex();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const dryingReview = {
    ...req.body,
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
module.exports = {
  index,
  unapprovedIndex,
  insert,
  show,
  remove,
};
