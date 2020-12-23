const express = require('express');
const {
  index,
  show,
  insert,
  update,
  remove,
} = require('../controllers/dryingReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');
const {
  setDryingReview,
  setPriorDryingReview,
  noPriorDryingReview,
  priorDryingReviewExists,
} = require('../middlewares/dryingReviewsMiddleware');

const dryingReviewsRouter = express.Router();

dryingReviewsRouter.get('/:writingSampleID', isAuth, setDryingReview, show);
dryingReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
dryingReviewsRouter.post(
  '/',
  isAuth,
  setDryingReview,
  setPriorDryingReview,
  noPriorDryingReview,
  insert,
);
dryingReviewsRouter.put('/edit', isAuth, isAdmin, setDryingReview, update);
dryingReviewsRouter.delete(
  '/:writingSampleID',
  isAuth,
  setDryingReview,
  setPriorDryingReview,
  priorDryingReviewExists,
  remove,
);

module.exports = dryingReviewsRouter;
