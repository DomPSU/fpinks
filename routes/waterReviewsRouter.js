const express = require('express');
const {
  index,
  show,
  insert,
  update,
  remove,
} = require('../controllers/waterReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');
const {
  validateWaterReview,
  setWaterReview,
  setPriorWaterReview,
  noPriorWaterReview,
  priorWaterReviewExists,
} = require('../middlewares/waterReviewsMiddleware');

const waterReviewsRouter = express.Router();

waterReviewsRouter.get('/:writingSampleID', isAuth, setWaterReview, show);
waterReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
waterReviewsRouter.post(
  '/',
  isAuth,
  validateWaterReview,
  setWaterReview,
  setPriorWaterReview,
  noPriorWaterReview,
  insert,
);
waterReviewsRouter.put(
  '/edit',
  isAuth,
  isAdmin,
  validateWaterReview,
  setWaterReview,
  update,
);
waterReviewsRouter.delete(
  '/:writingSampleID',
  isAuth,
  setWaterReview,
  setPriorWaterReview,
  priorWaterReviewExists,
  remove,
);

module.exports = waterReviewsRouter;
