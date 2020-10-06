const express = require('express');
const shadingReviewsService = require('../services/shadingReviewsService');
const authService = require('../services/authService');

const shadingReviewsRouter = express.Router();

// GET
shadingReviewsRouter.get('/:writingSampleID', shadingReviewsService.show);
shadingReviewsRouter.get('/', shadingReviewsService.index);

// POST
shadingReviewsRouter.post(
  '/admin/:approved',
  authService.isUser,
  authService.isAdmin,
  shadingReviewsService.isApprovedIndex,
);

shadingReviewsRouter.post('/', shadingReviewsService.insert);

module.exports = shadingReviewsRouter;
