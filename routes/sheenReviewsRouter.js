const express = require('express');
const sheenReviewsService = require('../services/sheenReviewsService');
const authMiddleware = require('../middlewares/authMiddleware');
const securityMiddleware = require('../middlewares/securityMiddleware');

const sheenReviewsRouter = express.Router();

// GET
sheenReviewsRouter.get('/:writingSampleID', sheenReviewsService.show);
sheenReviewsRouter.get(
  '/',
  securityMiddleware.sanitizeQueryString,
  sheenReviewsService.index,
);

// POST
sheenReviewsRouter.post(
  '/admin/',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  securityMiddleware.sanitizeQueryString,
  sheenReviewsService.adminIndex,
);

sheenReviewsRouter.post('/', sheenReviewsService.insert);

module.exports = sheenReviewsRouter;
