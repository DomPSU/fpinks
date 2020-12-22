const express = require('express');
const {
  index,
  show,
  insert,
  update,
  remove,
} = require('../controllers/waterReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
  appendUserToQS,
  appendWritingSampleToQS,
} = require('../middlewares/queryStringMiddleware');
const {
  setWaterReview,
  setPriorWaterReview,
  noPriorWaterReview,
  priorWaterReviewExists,
} = require('../middlewares/waterReviewsMiddleware');

const waterReviewsRouter = express.Router();

waterReviewsRouter.get('/:writingSampleID', isAuth, setWaterReview, show);
waterReviewsRouter.get('/', sanitizeQueryString, processQueryString, index);
waterReviewsRouter.post(
  '/',
  isAuth,
  setWaterReview,
  setPriorWaterReview,
  noPriorWaterReview,
  insert,
);
waterReviewsRouter.put('/edit', isAuth, isAdmin, setWaterReview, update);
waterReviewsRouter.delete(
  '/:writingSampleID',
  isAuth,
  setWaterReview,
  setPriorWaterReview,
  priorWaterReviewExists,
  remove,
);

module.exports = waterReviewsRouter;
