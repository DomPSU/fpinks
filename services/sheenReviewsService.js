const sheenReviewsModel = require('../models/sheenReviewsModel');

const index = async (req, res, next) => {
  let data;
  try {
    data = await sheenReviewsModel.index();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  let data;
  const { writingSampleID } = req.params;

  try {
    data = await sheenReviewsModel.show(writingSampleID);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const isApprovedIndex = async (req, res, next) => {
  const { approved } = req.params;
  try {
    const data = await sheenReviewsModel.isApprovedIndex(approved);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const sheenReview = {
    ...req.body,
  };

  // delete existing sheen review for user and writing sample
  try {
    await sheenReviewsModel.remove(sheenReview);
  } catch (e) {
    next(e);
  }

  // insert new sheen review
  try {
    const data = await sheenReviewsModel.insert(sheenReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const sheenReview = {
    ...req.body,
  };

  try {
    const data = await sheenReviewsModel.remove(sheenReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};
module.exports = {
  index,
  isApprovedIndex,
  insert,
  show,
  remove,
};
