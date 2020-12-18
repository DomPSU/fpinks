const express = require('express');
const {
  index,
  show,
  insert,
  update,
  remove,
} = require('../controllers/featheringReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
} = require('../middlewares/queryStringMiddleware');

const featheringReviewsRouter = express.Router();

featheringReviewsRouter.get(
  '/:writingSampleID',
  isAuth,
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
  index,
);
featheringReviewsRouter.get(
  '/',
  sanitizeQueryString,
  processQueryString,
  index,
);
featheringReviewsRouter.post('/', isAuth, insert);
featheringReviewsRouter.put('/edit', isAuth, isAdmin, update);
featheringReviewsRouter.delete('/:writingSampleID', isAuth, remove);

module.exports = featheringReviewsRouter;
