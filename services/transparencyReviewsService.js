const transparencyReviewsModel = require('../models/transparencyReviewsModel');

const index = async (req, res, next) => {
  const queryKeys = res.locals.queryKeys || [];
  const queryValues = res.locals.queryValues || [];

  try {
    const data = await transparencyReviewsModel.index(queryKeys, queryValues);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};
const show = async (req, res, next) => {
  let data;
  const { writingSampleID } = req.params;

  try {
    data = await transparencyReviewsModel.show(writingSampleID);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const adminIndex = async (req, res, next) => {
  const queryKeys = res.locals.queryKeys || [];
  const queryValues = res.locals.queryValues || [];

  try {
    const data = await transparencyReviewsModel.adminIndex(
      queryKeys,
      queryValues,
    );
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const transparencyReview = {
    ...req.body,
  };

  // delete existing transparency review for user and writing sample
  try {
    await transparencyReviewsModel.remove(transparencyReview);
  } catch (e) {
    next(e);
  }

  // insert new transparency review
  try {
    const data = await transparencyReviewsModel.insert(transparencyReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const transparencyReview = {
    ...req.body,
  };

  try {
    const data = await transparencyReviewsModel.remove(transparencyReview);
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
