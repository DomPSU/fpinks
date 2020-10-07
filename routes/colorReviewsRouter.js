const express = require('express');
const colorReviewsService = require('../services/colorReviewsService');
const authMiddleware = require('../middlewares/authMiddleware');
const securityMiddleware = require('../middlewares/securityMiddleware');

const colorReviewsRouter = express.Router();

// GET
colorReviewsRouter.get('/:writingSampleID', colorReviewsService.show);

colorReviewsRouter.get(
  '/',
  securityMiddleware.sanitizeQueryString,
  colorReviewsService.index,
);

// POST
colorReviewsRouter.post(
  '/admin/',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  securityMiddleware.sanitizeQueryString,
  colorReviewsService.adminIndex,
);

colorReviewsRouter.post('/', colorReviewsService.insert);

module.exports = colorReviewsRouter;
