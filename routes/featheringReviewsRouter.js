const express = require('express');
const featheringReviewsService = require('../services/featheringReviewsService');
const authMiddleware = require('../middlewares/authMiddleware');
const securityMiddleware = require('../middlewares/securityMiddleware');

const featheringReviewsRouter = express.Router();

// GET
featheringReviewsRouter.get('/:writingSampleID', featheringReviewsService.show);

featheringReviewsRouter.get(
  '/',
  securityMiddleware.sanitizeQueryString,
  featheringReviewsService.index,
);

// POST
featheringReviewsRouter.post(
  '/admin/',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  securityMiddleware.sanitizeQueryString,
  featheringReviewsService.adminIndex,
);

featheringReviewsRouter.post('/', featheringReviewsService.insert);

module.exports = featheringReviewsRouter;
