const express = require('express');
const {
  index,
  show,
  insert,
  update,
} = require('../controllers/dryingReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const dryingReviewsRouter = express.Router();

dryingReviewsRouter.get('/:writing_sample_id', isAuth, show);
dryingReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
dryingReviewsRouter.post('/', isAuth, insert);
dryingReviewsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = dryingReviewsRouter;
