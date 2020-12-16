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
  const colorReview = {
    ...req.body,
    userID: res.locals.user.user_id,
  };

  // delete all existing color reviews for user and writing sample
  try {
    await colorReviewsModel.remove(colorReview);
  } catch (e) {
    next(e);
  }

  // insert third color review if needed
  if (colorReview.colorThree !== '' && colorReview.colorThree !== null) {
    // set up second color review
    const colorReviewThree = {
      writingSampleID: colorReview.writingSampleID,
      userID: colorReview.userID,
      colorName: colorReview.colorThree,
    };

    try {
      await colorReviewsModel.insert(colorReviewThree);
    } catch (e) {
      next(e);
    }
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

const update = async (req, res, next) => {
  const colorReview = {
    ...req.body,
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
