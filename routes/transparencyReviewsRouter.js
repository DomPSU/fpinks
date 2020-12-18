const express = require('express');
const {
  index,
  show,
  insert,
  update,
  remove,
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
  '/:writingSampleID',
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
transparencyReviewsRouter.delete('/:writingSampleID', isAuth, remove);

module.exports = transparencyReviewsRouter;
