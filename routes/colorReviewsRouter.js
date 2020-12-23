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
  noMaxPriorColorReviews,
  priorColorReviewsExists,
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
  noMaxPriorColorReviews,
  insert,
);
colorReviewsRouter.put(
  '/edit',
  isAuth,
  isAdmin,
  validateColorReview,
  setColorReview,
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
