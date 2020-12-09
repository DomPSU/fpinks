const express = require('express');
const {
  index,
  adminIndex,
  insert,
} = require('../services/sheenReviewsService');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const sheenReviewsRouter = express.Router();

// GET
// TODO show
sheenReviewsRouter.get('/', sanitizeQueryString, index);

// POST
sheenReviewsRouter.post(
  '/admin/',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  adminIndex,
);

// TODO update

sheenReviewsRouter.post('/', insert);

module.exports = sheenReviewsRouter;
