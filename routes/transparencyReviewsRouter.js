const express = require('express');
const transparencyReviewsService = require('../services/transparencyReviewsService');
const authMiddleware = require('../middlewares/authMiddleware');
const securityMiddleware = require('../middlewares/securityMiddleware');

const transparencyReviewsRouter = express.Router();

// GET
transparencyReviewsRouter.get(
  '/:writingSampleID',
  transparencyReviewsService.show,
);
transparencyReviewsRouter.get(
  '/',
  securityMiddleware.sanitizeQueryString,
  transparencyReviewsService.index,
);

// POST
transparencyReviewsRouter.post(
  '/admin/',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  securityMiddleware.sanitizeQueryString,
  transparencyReviewsService.adminIndex,
);

transparencyReviewsRouter.post('/', transparencyReviewsService.insert);

module.exports = transparencyReviewsRouter;
