const express = require('express');
const {
  index,
  update,
  insert,
} = require('../controllers/colorReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const colorReviewsRouter = express.Router();

// GET
colorReviewsRouter.get('/admin', isAuth, isAdmin, sanitizeQueryString, index);
// TODO show
colorReviewsRouter.get('/', sanitizeQueryString, index);

// POST
colorReviewsRouter.post('/', isAuth, insert);

// PUT
colorReviewsRouter.put('/edit', isAuth, update);

module.exports = colorReviewsRouter;
