const express = require('express');
const {
  index,
  insert,
  update,
} = require('../controllers/transparencyReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const transparencyReviewsRouter = express.Router();

// GET
transparencyReviewsRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  processQueryString,
  index,
);
// TODO SHOW
transparencyReviewsRouter.get(
  '/',
  sanitizeQueryString,
  processQueryString,
  index,
);

// POST
transparencyReviewsRouter.post('/', isAuth, insert);

// PUT
transparencyReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = transparencyReviewsRouter;
