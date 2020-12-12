const express = require('express');
const {
  index,
  insert,
  update,
} = require('../controllers/waterReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const waterReviewsRouter = express.Router();

// TODO show
waterReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
waterReviewsRouter.post('/', isAuth, insert);
waterReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = waterReviewsRouter;
