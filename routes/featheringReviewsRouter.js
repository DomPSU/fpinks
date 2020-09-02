const express = require('express');
const featheringReviewsService = require('../services/featheringReviewsService');

const featheringReviewsRouter = express.Router();

// GET
featheringReviewsRouter.get(
  '/unapproved',
  featheringReviewsService.unapprovedIndex,
);
featheringReviewsRouter.get('/:writingSampleID', featheringReviewsService.show);
featheringReviewsRouter.get('/', featheringReviewsService.index);

// POST
featheringReviewsRouter.post(featheringReviewsService.insert);

module.exports = featheringReviewsRouter;
