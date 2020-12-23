const express = require('express');
const {
  index,
  show,
  insert,
  update,
  remove,
} = require('../controllers/sheenReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');
const {
  validateSheenReview,
  setSheenReview,
  setPriorSheenReview,
  noPriorSheenReview,
  priorSheenReviewExists,
} = require('../middlewares/sheenReviewsMiddleware');

const sheenReviewsRouter = express.Router();

sheenReviewsRouter.get('/:writingSampleID', isAuth, setSheenReview, show);
sheenReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
sheenReviewsRouter.post(
  '/',
  isAuth,
  validateSheenReview,
  setSheenReview,
  setPriorSheenReview,
  noPriorSheenReview,
  insert,
);
sheenReviewsRouter.put(
  '/edit',
  isAuth,
  isAdmin,
  validateSheenReview,
  setSheenReview,
  update,
);
sheenReviewsRouter.delete(
  '/:writingSampleID',
  isAuth,
  setSheenReview,
  setPriorSheenReview,
  priorSheenReviewExists,
  remove,
);

module.exports = sheenReviewsRouter;
