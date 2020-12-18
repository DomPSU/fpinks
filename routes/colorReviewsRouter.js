const express = require('express');
const {
  index,
  update,
  insert,
  remove,
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
  '/:writingSampleID',
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
colorReviewsRouter.delete('/:writingSampleID', isAuth, remove);

module.exports = colorReviewsRouter;
