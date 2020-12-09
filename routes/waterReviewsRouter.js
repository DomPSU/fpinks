const express = require('express');
const {
  index,
  adminIndex,
  insert,
} = require('../controllers/waterReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const waterReviewsRouter = express.Router();

// GET
// TODO show
waterReviewsRouter.get('/', sanitizeQueryString, index);

// POST
waterReviewsRouter.post(
  '/admin/',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  adminIndex,
);

waterReviewsRouter.post('/', insert);

// TOOD update

module.exports = waterReviewsRouter;
