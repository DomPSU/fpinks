const express = require('express');
const {
  index,
  show,
  insert,
  update,
  remove,
} = require('../controllers/featheringReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');
const {
  validateFeatheringReview,
  setFeatheringReview,
  setPriorFeatheringReview,
  noPriorFeatheringReview,
  priorFeatheringReviewExists,
} = require('../middlewares/featheringReviewsMiddleware');

const featheringReviewsRouter = express.Router();

featheringReviewsRouter.get(
  '/:writingSampleID',
  isAuth,
  setFeatheringReview,
  show,
);
featheringReviewsRouter.get(
  '/',
  sanitizeQueryString,
  processQueryString,
  index,
);
featheringReviewsRouter.post(
  '/',
  isAuth,
  validateFeatheringReview,
  setFeatheringReview,
  setPriorFeatheringReview,
  noPriorFeatheringReview,
  insert,
);
featheringReviewsRouter.put(
  '/edit',
  isAuth,
  isAdmin,
  validateFeatheringReview,
  setFeatheringReview,
  update,
);
featheringReviewsRouter.delete(
  '/:writingSampleID',
  isAuth,
  setFeatheringReview,
  setPriorFeatheringReview,
  priorFeatheringReviewExists,
  remove,
);

module.exports = featheringReviewsRouter;
