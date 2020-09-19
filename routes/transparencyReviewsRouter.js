const express = require('express');
const transparencyReviewsService = require('../services/transparencyReviewsService');

const transparencyReviewsRouter = express.Router();

// GET
transparencyReviewsRouter.get(
  '/unapproved',
  transparencyReviewsService.unapprovedIndex,
);
transparencyReviewsRouter.get(
  '/:writingSampleID',
  transparencyReviewsService.show,
);
transparencyReviewsRouter.get('/', transparencyReviewsService.index);

// POST
transparencyReviewsRouter.post('/', transparencyReviewsService.insert);

module.exports = transparencyReviewsRouter;
