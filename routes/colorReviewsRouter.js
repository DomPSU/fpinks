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

// TODO show
colorReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
colorReviewsRouter.post('/', isAuth, insert);
colorReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = colorReviewsRouter;
