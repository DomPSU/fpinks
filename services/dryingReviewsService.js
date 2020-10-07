const dryingReviewsModel = require('../models/dryingReviewsModel');

const index = async (req, res, next) => {
  const queryKeys = res.locals.queryKeys || [];
  const queryValues = res.locals.queryValues || [];

  try {
    const data = await dryingReviewsModel.index(queryKeys, queryValues);
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

const adminIndex = async (req, res, next) => {
  const queryKeys = res.locals.queryKeys || [];
  const queryValues = res.locals.queryValues || [];

  try {
    const data = await dryingReviewsModel.adminIndex(queryKeys, queryValues);
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
  adminIndex,
  insert,
  show,
  remove,
};
