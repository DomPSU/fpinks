const express = require('express');
const dryingReviewsService = require('../services/dryingReviewsService');

const dryingReviewsRouter = express.Router();

// GET
dryingReviewsRouter.get('/unapproved', dryingReviewsService.unapprovedIndex);
dryingReviewsRouter.get('/:writingSampleID', dryingReviewsService.show);
dryingReviewsRouter.get('/', dryingReviewsService.index);

// POST
dryingReviewsRouter.post(dryingReviewsService.insert);

module.exports = dryingReviewsRouter;
