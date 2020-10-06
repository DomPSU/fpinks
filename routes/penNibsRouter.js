const express = require('express');
const penNibsService = require('../services/penNibsService');
const authService = require('../services/authService');

const penNibsRouter = express.Router();

// GET
penNibsRouter.get('/', penNibsService.index);

// POST
penNibsRouter.post(
  '/admin/:approved',
  authService.isUser,
  authService.isAdmin,
  penNibsService.isApprovedIndex,
);
penNibsRouter.post('/', penNibsService.insert);

module.exports = penNibsRouter;
