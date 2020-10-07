const express = require('express');
const penNibsService = require('../services/penNibsService');
const authMiddleware = require('../middlewares/authMiddleware');

const penNibsRouter = express.Router();

// GET
penNibsRouter.get('/', penNibsService.index);

// POST
penNibsRouter.post(
  '/admin/:approved',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  penNibsService.isApprovedIndex,
);
penNibsRouter.post('/', penNibsService.insert);

module.exports = penNibsRouter;
