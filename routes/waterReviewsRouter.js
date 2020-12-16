const express = require('express');
const {
  index,
  show,
  insert,
  update,
} = require('../controllers/waterReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
} = require('../middlewares/queryStringMiddleware');

const waterReviewsRouter = express.Router();

waterReviewsRouter.get(
  '/:writing_sample_id',
  isAuth,
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
  index,
);
waterReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
waterReviewsRouter.post('/', isAuth, insert);
waterReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = waterReviewsRouter;
