const express = require('express');
const {
  index,
  show,
  insert,
  update,
  remove,
} = require('../controllers/sheenReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
} = require('../middlewares/queryStringMiddleware');

const sheenReviewsRouter = express.Router();

sheenReviewsRouter.get(
  '/:writingSampleID',
  isAuth,
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
  index,
);
sheenReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
sheenReviewsRouter.post('/', isAuth, insert);
sheenReviewsRouter.put('/edit', isAuth, isAdmin, update);
sheenReviewsRouter.delete('/:writingSampleID', isAuth, remove);

module.exports = sheenReviewsRouter;
