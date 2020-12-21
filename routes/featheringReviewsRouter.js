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
  appendUserToQS,
  appendWritingSampleToQS,
} = require('../middlewares/queryStringMiddleware');
const {
  setFeatheringReview,
  setPriorFeatheringReview,
  noPriorFeatheringReview,
  priorFeatheringReviewExists,
} = require('../middlewares/featheringReviewsMiddleware');

const featheringReviewsRouter = express.Router();

featheringReviewsRouter.get(
  '/:writingSampleID',
  isAuth,
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
  index,
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
  setFeatheringReview,
  setPriorFeatheringReview,
  noPriorFeatheringReview,
  insert,
);
featheringReviewsRouter.put(
  '/edit',
  isAuth,
  isAdmin,
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
