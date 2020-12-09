const express = require('express');
const {
  index,
  adminIndex,
  insert,
} = require('../controllers/dryingReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const dryingReviewsRouter = express.Router();

// GET
// TODO show
dryingReviewsRouter.get('/', sanitizeQueryString, index);

// POST
dryingReviewsRouter.post(
  '/admin/',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  adminIndex,
);

dryingReviewsRouter.post('/', insert);

// TODO update

module.exports = dryingReviewsRouter;
