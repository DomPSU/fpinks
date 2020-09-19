const express = require('express');
const waterReviewsService = require('../services/waterReviewsService');

const waterReviewsRouter = express.Router();

// GET
waterReviewsRouter.get('/unapproved', waterReviewsService.unapprovedIndex);
waterReviewsRouter.get('/:writingSampleID', waterReviewsService.show);
waterReviewsRouter.get('/', waterReviewsService.index);

// POST
waterReviewsRouter.post('/', waterReviewsService.insert);

module.exports = waterReviewsRouter;
