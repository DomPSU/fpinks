const express = require('express');
const {
  index,
  adminIndex,
  insert,
} = require('../controllers/transparencyReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');

const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const transparencyReviewsRouter = express.Router();

// GET
// TODO SHOW
transparencyReviewsRouter.get('/', sanitizeQueryString, index);

// POST
transparencyReviewsRouter.post(
  '/admin/',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  adminIndex,
);

// TODO UPDATE

transparencyReviewsRouter.post('/', insert);

module.exports = transparencyReviewsRouter;
