const express = require('express');
const colorReviewsService = require('../services/colorReviewsService');
const authService = require('../services/authService');

const colorReviewsRouter = express.Router();

// GET
colorReviewsRouter.get('/:writingSampleID', colorReviewsService.show);
colorReviewsRouter.get('/', colorReviewsService.index);

// POST
colorReviewsRouter.post(
  '/admin/:approved',
  authService.isUser,
  authService.isAdmin,
  colorReviewsService.isApprovedIndex,
);

colorReviewsRouter.post('/', colorReviewsService.insert);

module.exports = colorReviewsRouter;
