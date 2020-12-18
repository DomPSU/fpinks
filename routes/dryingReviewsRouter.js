const express = require('express');
const {
  index,
  show,
  insert,
  update,
} = require('../controllers/dryingReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
} = require('../middlewares/queryStringMiddleware');

const dryingReviewsRouter = express.Router();

dryingReviewsRouter.get(
  '/:writingSampleID',
  isAuth,
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
  index,
);
dryingReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
dryingReviewsRouter.post('/', isAuth, insert);
dryingReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = dryingReviewsRouter;
