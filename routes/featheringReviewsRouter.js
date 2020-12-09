const express = require('express');
const {
  index,
  adminIndex,
  insert,
} = require('../controllers/featheringReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const featheringReviewsRouter = express.Router();

// GET
// TODO show
featheringReviewsRouter.get('/', sanitizeQueryString, index);

// POST
featheringReviewsRouter.post(
  '/admin/',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  adminIndex,
);

featheringReviewsRouter.post('/', insert);

// TODO update

module.exports = featheringReviewsRouter;
