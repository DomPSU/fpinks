const express = require('express');
const colorReviewsService = require('../services/colorReviewsService');

const colorReviewsRouter = express.Router();

// GET
colorReviewsRouter.get('/unapproved', colorReviewsService.unapprovedIndex);
colorReviewsRouter.get('/:writingSampleID', colorReviewsService.show);
colorReviewsRouter.get('/', colorReviewsService.index);

// POST
colorReviewsRouter.post('/', colorReviewsService.insert);

module.exports = colorReviewsRouter;
