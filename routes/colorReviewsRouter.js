const express = require('express');
const {
  index,
  update,
  insert,
} = require('../controllers/colorReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const colorReviewsRouter = express.Router();

// GET
colorReviewsRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  processQueryString,
  index,
);
// TODO show
colorReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);

// POST
colorReviewsRouter.post('/', isAuth, insert);

// PUT
colorReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = colorReviewsRouter;
