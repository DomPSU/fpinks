const express = require('express');
const {
  index,
  show,
  insert,
  update,
  remove,
} = require('../controllers/shadingReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');
const {
  setShadingReview,
  setPriorShadingReview,
  noPriorShadingReview,
  priorShadingReviewExists,
} = require('../middlewares/shadingReviewsMiddleware');

const shadingReviewsRouter = express.Router();

shadingReviewsRouter.get('/:writingSampleID', isAuth, setShadingReview, show);
shadingReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
shadingReviewsRouter.post(
  '/',
  isAuth,
  setShadingReview,
  setPriorShadingReview,
  noPriorShadingReview,
  insert,
);
shadingReviewsRouter.put('/edit', isAuth, isAdmin, setShadingReview, update);
shadingReviewsRouter.delete(
  '/:writingSampleID',
  isAuth,
  setShadingReview,
  setPriorShadingReview,
  priorShadingReviewExists,
  remove,
);

module.exports = shadingReviewsRouter;
