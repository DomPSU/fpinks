const express = require('express');
const penNibsService = require('../services/penNibsService');
const authMiddleware = require('../middlewares/authMiddleware');
const securityMiddleware = require('../middlewares/securityMiddleware');

const penNibsRouter = express.Router();

// GET
penNibsRouter.get(
  '/',
  securityMiddleware.sanitizeQueryString,
  penNibsService.index,
);

// POST
penNibsRouter.post(
  '/admin/',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  securityMiddleware.sanitizeQueryString,
  penNibsService.adminIndex,
);
penNibsRouter.post('/', penNibsService.insert);

module.exports = penNibsRouter;
