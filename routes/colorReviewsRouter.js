const express = require('express');
const {
  index,
  update,
  insert,
  remove,
  show,
} = require('../controllers/colorReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');
const {
  validateColorReview,
  setColorReview,
  setPriorColorReviews,
  underMaxPriorColorReviews,
  priorColorReviewsExists,
  noNoneColorReviewConflict,
} = require('../middlewares/colorReviewsMiddleware');

const colorReviewsRouter = express.Router();

colorReviewsRouter.get('/:writingSampleID', isAuth, setColorReview, show);
colorReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
colorReviewsRouter.post(
  '/',
  isAuth,
  validateColorReview,
  setColorReview,
  setPriorColorReviews,
  underMaxPriorColorReviews,
  noNoneColorReviewConflict,
  insert,
);
colorReviewsRouter.put(
  '/edit',
  isAuth,
  isAdmin,
  validateColorReview,
  setColorReview,
  noNoneColorReviewConflict,
  update,
);
colorReviewsRouter.delete(
  '/:writingSampleID',
  isAuth,
  setColorReview,
  setPriorColorReviews,
  priorColorReviewsExists,
  remove,
);

module.exports = colorReviewsRouter;
