const express = require('express');
const sheenReviewsService = require('../services/sheenReviewsService');
const authService = require('../services/authService');

const sheenReviewsRouter = express.Router();

// GET
sheenReviewsRouter.get('/:writingSampleID', sheenReviewsService.show);
sheenReviewsRouter.get('/', sheenReviewsService.index);

// POST
sheenReviewsRouter.post(
  '/admin/:approved',
  authService.isUser,
  authService.isAdmin,
  sheenReviewsService.isApprovedIndex,
);

sheenReviewsRouter.post('/', sheenReviewsService.insert);

module.exports = sheenReviewsRouter;
