const express = require('express');
const inksService = require('../services/inksService');
const authMiddleware = require('../middlewares/authMiddleware');

const inksRouter = express.Router();

// GET
inksRouter.get('/:id', inksService.show);
inksRouter.get('/', inksService.index);

// POST
inksRouter.post(
  '/admin/:approved',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  inksService.isApprovedIndex,
);

inksRouter.post('/', inksService.insert);

module.exports = inksRouter;
