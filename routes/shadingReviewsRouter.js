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

const shadingReviewsRouter = express.Router();

shadingReviewsRouter.get(
  '/:writing_sample_id',
  isAuth,
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
  index,
);
shadingReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
shadingReviewsRouter.post('/', isAuth, insert);
shadingReviewsRouter.put('/edit', isAuth, isAdmin, update);
shadingReviewsRouter.delete('/:writingSampleID', isAuth, remove);

module.exports = shadingReviewsRouter;
