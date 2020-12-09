const express = require('express');
const { index, insert } = require('../controllers/waterReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const waterReviewsRouter = express.Router();

// GET
waterReviewsRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  processQueryString,
  index,
);
// TODO show
waterReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);

// POST
waterReviewsRouter.post('/', isAuth, insert);

// TODO PUT

module.exports = waterReviewsRouter;
