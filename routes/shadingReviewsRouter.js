const express = require('express');
const { index, insert } = require('../controllers/shadingReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const shadingReviewsRouter = express.Router();

// GET
shadingReviewsRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  processQueryString,
  index,
);
// TODO show
shadingReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);

// POST
shadingReviewsRouter.post('/', isAuth, insert);

// TODO PUT

module.exports = shadingReviewsRouter;
