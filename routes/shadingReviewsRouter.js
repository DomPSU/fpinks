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

// TODO show
shadingReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
shadingReviewsRouter.post('/', isAuth, insert);
shadingReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = shadingReviewsRouter;
