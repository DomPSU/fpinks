const express = require('express');
const {
  index,
  insert,
  update,
} = require('../controllers/transparencyReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const transparencyReviewsRouter = express.Router();

// TODO SHOW
transparencyReviewsRouter.get(
  '/',
  sanitizeQueryString,
  processQueryString,
  index,
);
transparencyReviewsRouter.post('/', isAuth, insert);
transparencyReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = transparencyReviewsRouter;
