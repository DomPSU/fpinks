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
