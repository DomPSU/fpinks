const express = require('express');
const {
  index,
  insert,
} = require('../controllers/transparencyReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');

const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const transparencyReviewsRouter = express.Router();

// GET
transparencyReviewsRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  index,
);
// TODO SHOW
transparencyReviewsRouter.get('/', sanitizeQueryString, index);

// POST
transparencyReviewsRouter.post('/', isAuth, insert);

module.exports = transparencyReviewsRouter;
