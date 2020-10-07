const express = require('express');
const inksService = require('../services/inksService');
const authMiddleware = require('../middlewares/authMiddleware');
const securityMiddleware = require('../middlewares/securityMiddleware');

const inksRouter = express.Router();

// GET
inksRouter.get('/:id', inksService.show);
inksRouter.get('/', securityMiddleware.sanitizeQueryString, inksService.index);

// POST
inksRouter.post(
  '/admin/',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  securityMiddleware.sanitizeQueryString,
  inksService.adminIndex,
);

inksRouter.post('/', inksService.insert);

module.exports = inksRouter;
