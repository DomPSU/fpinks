const express = require('express');
const waterReviewsService = require('../services/waterReviewsService');
const authMiddleware = require('../middlewares/authMiddleware');
const securityMiddleware = require('../middlewares/securityMiddleware');

const waterReviewsRouter = express.Router();

// GET
waterReviewsRouter.get(
  '/',
  securityMiddleware.sanitizeQueryString,
  waterReviewsService.index,
);

// POST
waterReviewsRouter.post(
  '/admin/',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  securityMiddleware.sanitizeQueryString,
  waterReviewsService.adminIndex,
);

waterReviewsRouter.post('/', waterReviewsService.insert);

module.exports = waterReviewsRouter;
