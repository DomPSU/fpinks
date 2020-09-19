const waterReviewsModel = require('../models/waterReviewsModel');

const index = async (req, res, next) => {
  let data;
  try {
    data = await waterReviewsModel.index();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  let data;
  const { writingSampleID } = req.params;

  try {
    data = await waterReviewsModel.show(writingSampleID);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const unapprovedIndex = async (req, res, next) => {
  let data;
  try {
    data = await waterReviewsModel.unapprovedIndex();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const waterReview = {
    ...req.body,
  };

  // delete existing waterproofness review for user and writing sample
  try {
    await waterReviewsModel.remove(waterReview);
  } catch (e) {
    next(e);
  }

  // insert new waterproofness review
  try {
    const data = await waterReviewsModel.insert(waterReview);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const waterReview = {
    ...req.body,
  };

  try {
    const data = await waterReviewsModel.remove(waterReview);
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
