const express = require('express');
const {
  index,
  insert,
  update,
} = require('../controllers/shadingReviewsController');
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

// PUT
shadingReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = shadingReviewsRouter;
