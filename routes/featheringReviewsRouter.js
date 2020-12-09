const express = require('express');
const { index, insert } = require('../controllers/featheringReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const featheringReviewsRouter = express.Router();

// GET
featheringReviewsRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  index,
);
// TODO show
featheringReviewsRouter.get('/', sanitizeQueryString, index);

// POST
featheringReviewsRouter.post('/', isAuth, insert);

// TODO PUT

module.exports = featheringReviewsRouter;
