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

// GET
sheenReviewsRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  processQueryString,
  index,
);
// TODO show
sheenReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);

// POST
sheenReviewsRouter.post('/', isAuth, insert);

// PUT
sheenReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = sheenReviewsRouter;
