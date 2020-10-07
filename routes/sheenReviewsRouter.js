const express = require('express');
const sheenReviewsService = require('../services/sheenReviewsService');
const authMiddleware = require('../middlewares/authMiddleware');

const sheenReviewsRouter = express.Router();

// GET
sheenReviewsRouter.get('/:writingSampleID', sheenReviewsService.show);
sheenReviewsRouter.get('/', sheenReviewsService.index);

// POST
sheenReviewsRouter.post(
  '/admin/:approved',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  sheenReviewsService.isApprovedIndex,
);

sheenReviewsRouter.post('/', sheenReviewsService.insert);

module.exports = sheenReviewsRouter;
