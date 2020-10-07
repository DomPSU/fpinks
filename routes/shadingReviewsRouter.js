const express = require('express');
const shadingReviewsService = require('../services/shadingReviewsService');
const authMiddleware = require('../middlewares/authMiddleware');
const securityMiddleware = require('../middlewares/securityMiddleware');

const shadingReviewsRouter = express.Router();

// GET
shadingReviewsRouter.get('/:writingSampleID', shadingReviewsService.show);
shadingReviewsRouter.get(
  '/',
  securityMiddleware.sanitizeQueryString,
  shadingReviewsService.index,
);

// POST
shadingReviewsRouter.post(
  '/admin/',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  securityMiddleware.sanitizeQueryString,
  shadingReviewsService.adminIndex,
);

shadingReviewsRouter.post('/', shadingReviewsService.insert);

module.exports = shadingReviewsRouter;
