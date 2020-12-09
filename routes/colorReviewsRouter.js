const express = require('express');
const {
  index,
  adminIndex,
  update,
  insert,
} = require('../services/colorReviewsService');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const colorReviewsRouter = express.Router();

// GET
// TODO show
colorReviewsRouter.get('/', sanitizeQueryString, index);

// POST
colorReviewsRouter.post(
  '/admin/',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  adminIndex,
);

colorReviewsRouter.post('/edit/', isAuth, isAdmin, update);

colorReviewsRouter.post('/', insert);

module.exports = colorReviewsRouter;
