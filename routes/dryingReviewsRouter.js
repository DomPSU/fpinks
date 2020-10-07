const express = require('express');
const dryingReviewsService = require('../services/dryingReviewsService');
const authMiddleware = require('../middlewares/authMiddleware');
const securityMiddleware = require('../middlewares/securityMiddleware');

const dryingReviewsRouter = express.Router();

// GET
dryingReviewsRouter.get(
  '/',
  securityMiddleware.sanitizeQueryString,
  dryingReviewsService.index,
);

// POST
// POST
dryingReviewsRouter.post(
  '/admin/',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  securityMiddleware.sanitizeQueryString,
  dryingReviewsService.adminIndex,
);

dryingReviewsRouter.post('/', dryingReviewsService.insert);

module.exports = dryingReviewsRouter;
