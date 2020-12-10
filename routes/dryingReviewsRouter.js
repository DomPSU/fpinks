const express = require('express');
const {
  index,
  insert,
  update,
} = require('../controllers/dryingReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const dryingReviewsRouter = express.Router();

// GET
dryingReviewsRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  processQueryString,
  index,
);
// TODO show
dryingReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);

// POST
dryingReviewsRouter.post('/', isAuth, insert);

// PUT
dryingReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = dryingReviewsRouter;
