const express = require('express');
const {
  index,
  show,
  insert,
  update,
  remove,
} = require('../controllers/transparencyReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
} = require('../middlewares/queryStringMiddleware');
const {
  setTransparencyReview,
  setPriorTransparencyReview,
  noPriorTransparencyReview,
  priorTransparencyReviewExists,
} = require('../middlewares/transparencyReviewsMiddleware');

const transparencyReviewsRouter = express.Router();

transparencyReviewsRouter.get(
  '/:writingSampleID',
  isAuth,
  setTransparencyReview,
  show,
);
transparencyReviewsRouter.get(
  '/',
  sanitizeQueryString,
  processQueryString,
  index,
);
transparencyReviewsRouter.post(
  '/',
  isAuth,
  setTransparencyReview,
  setPriorTransparencyReview,
  noPriorTransparencyReview,
  insert,
);
transparencyReviewsRouter.put(
  '/edit',
  isAuth,
  isAdmin,
  setTransparencyReview,
  update,
);
transparencyReviewsRouter.delete(
  '/:writingSampleID',
  isAuth,
  setTransparencyReview,
  setPriorTransparencyReview,
  priorTransparencyReviewExists,
  remove,
);

module.exports = transparencyReviewsRouter;
