const express = require('express');
const inksService = require('../services/inksService');
const authService = require('../services/authService');

const inksRouter = express.Router();

// GET
inksRouter.get('/:id', inksService.show);
inksRouter.get('/', inksService.index);

// POST
inksRouter.post(
  '/admin/:approved',
  authService.isUser,
  authService.isAdmin,
  inksService.isApprovedIndex,
);

inksRouter.post('/', inksService.insert);

module.exports = inksRouter;
