const express = require('express');
const {
  index,
  insert,
  update,
} = require('../controllers/featheringReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const featheringReviewsRouter = express.Router();

// GET
featheringReviewsRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  processQueryString,
  index,
);
// TODO show
featheringReviewsRouter.get(
  '/',
  sanitizeQueryString,
  processQueryString,
  index,
);

// POST
featheringReviewsRouter.post('/', isAuth, insert);

// PUT
featheringReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = featheringReviewsRouter;
