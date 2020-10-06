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

const isApprovedIndex = async (req, res, next) => {
  const { approved } = req.params;
  try {
    const data = await colorReviewsModel.isApprovedIndex(approved);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const colorReview = {
    ...req.body,
  };

  // delete all existing color reviews for user and writing sample
  try {
    const data = await colorReviewsModel.remove(colorReview);
  } catch (e) {
    next(e);
  }

  // insert second color review if needed
  if (colorReview.colorTwo !== '' && colorReview.colorTwo !== null) {
    // set up second color review
    const colorReviewTwo = {
      writingSampleID: colorReview.writingSampleID,
      userID: colorReview.userID,
      colorName: colorReview.colorTwo,
    };

    try {
      await colorReviewsModel.insert(colorReviewTwo);
    } catch (e) {
      next(e);
    }
  }

  // setup needed first color review
  const colorReviewOne = {
    writingSampleID: colorReview.writingSampleID,
    userID: colorReview.userID,
    colorName: colorReview.colorOne,
  };

  // insert first color review
  try {
    const data = await colorReviewsModel.insert(colorReviewOne);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  const colorReview = {
    ...req.body,
  };

  try {
    const data = await colorReviewsModel.remove(colorReview);
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
