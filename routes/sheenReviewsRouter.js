const express = require('express');
const sheenReviewsService = require('../services/sheenReviewsService');

const sheenReviewsRouter = express.Router();

// GET
sheenReviewsRouter.get('/unapproved', sheenReviewsService.unapprovedIndex);
sheenReviewsRouter.get('/:writingSampleID', sheenReviewsService.show);
sheenReviewsRouter.get('/', sheenReviewsService.index);

// POST
sheenReviewsRouter.post('/', sheenReviewsService.insert);

module.exports = sheenReviewsRouter;
