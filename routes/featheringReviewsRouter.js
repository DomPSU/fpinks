const express = require('express');
const {
  index,
  show,
  insert,
  update,
} = require('../controllers/featheringReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const featheringReviewsRouter = express.Router();

featheringReviewsRouter.get('/:writing_sample_id', isAuth, show);
featheringReviewsRouter.get(
  '/',
  sanitizeQueryString,
  processQueryString,
  index,
);
featheringReviewsRouter.post('/', isAuth, insert);
featheringReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = featheringReviewsRouter;
