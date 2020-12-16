const express = require('express');
const {
  index,
  show,
  insert,
  update,
} = require('../controllers/transparencyReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
} = require('../middlewares/queryStringMiddleware');

const transparencyReviewsRouter = express.Router();

transparencyReviewsRouter.get(
  '/:writing_sample_id',
  isAuth,
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
  index,
);
transparencyReviewsRouter.get(
  '/',
  sanitizeQueryString,
  processQueryString,
  index,
);
transparencyReviewsRouter.post('/', isAuth, insert);
transparencyReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = transparencyReviewsRouter;
