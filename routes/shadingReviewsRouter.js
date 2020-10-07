const express = require('express');
const shadingReviewsService = require('../services/shadingReviewsService');
const authMiddleware = require('../middlewares/authMiddleware');

const shadingReviewsRouter = express.Router();

// GET
shadingReviewsRouter.get('/:writingSampleID', shadingReviewsService.show);
shadingReviewsRouter.get('/', shadingReviewsService.index);

// POST
shadingReviewsRouter.post(
  '/admin/:approved',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  shadingReviewsService.isApprovedIndex,
);

shadingReviewsRouter.post('/', shadingReviewsService.insert);

module.exports = shadingReviewsRouter;
