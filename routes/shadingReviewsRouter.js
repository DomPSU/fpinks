const express = require('express');
const {
  index,
  adminIndex,
  insert,
} = require('../services/shadingReviewsService');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const shadingReviewsRouter = express.Router();

// GET
// TODO show
shadingReviewsRouter.get('/', sanitizeQueryString, index);

// POST
shadingReviewsRouter.post(
  '/admin/',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  adminIndex,
);

shadingReviewsRouter.post('/', insert);

// TODO update

module.exports = shadingReviewsRouter;
