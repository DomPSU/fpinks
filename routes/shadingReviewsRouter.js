const express = require('express');
const shadingReviewsService = require('../services/shadingReviewsService');

const shadingReviewsRouter = express.Router();

// GET
shadingReviewsRouter.get('/unapproved', shadingReviewsService.unapprovedIndex);
shadingReviewsRouter.get('/:writingSampleID', shadingReviewsService.show);
shadingReviewsRouter.get('/', shadingReviewsService.index);

// POST
shadingReviewsRouter.post('/', shadingReviewsService.insert);

module.exports = shadingReviewsRouter;
