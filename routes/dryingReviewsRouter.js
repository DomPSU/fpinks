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

// TODO show
dryingReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
dryingReviewsRouter.post('/', isAuth, insert);
dryingReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = dryingReviewsRouter;
