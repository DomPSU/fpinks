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
  appendUserToQS,
  appendWritingSampleToQS,
} = require('../middlewares/queryStringMiddleware');
const { setShadingReview } = require('../middlewares/shadingReviewsMiddleware');

const shadingReviewsRouter = express.Router();

shadingReviewsRouter.get(
  '/:writingSampleID',
  isAuth,
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
  index,
);
shadingReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
shadingReviewsRouter.post('/', isAuth, setShadingReview, insert);
shadingReviewsRouter.put('/edit', isAuth, isAdmin, setShadingReview, update);
shadingReviewsRouter.delete(
  '/:writingSampleID',
  isAuth,
  setShadingReview,
  remove,
);

module.exports = shadingReviewsRouter;
