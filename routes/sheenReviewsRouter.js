const express = require('express');
const {
  index,
  insert,
  update,
} = require('../controllers/sheenReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const sheenReviewsRouter = express.Router();

// TODO show
sheenReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
sheenReviewsRouter.post('/', isAuth, insert);
sheenReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = sheenReviewsRouter;
