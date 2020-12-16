const express = require('express');
const {
  index,
  update,
  insert,
} = require('../controllers/colorReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
} = require('../middlewares/queryStringMiddleware');

const colorReviewsRouter = express.Router();

colorReviewsRouter.get(
  '/:writing_sample_id',
  isAuth,
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
  index,
);
colorReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
colorReviewsRouter.post('/', isAuth, insert);
colorReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = colorReviewsRouter;
