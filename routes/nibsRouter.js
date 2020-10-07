const express = require('express');
const nibsService = require('../services/nibsService');
const authMiddleware = require('../middlewares/authMiddleware');
const securityMiddleware = require('../middlewares/securityMiddleware');

const nibsRouter = express.Router();

// GET
nibsRouter.get('/:id', nibsService.show);
nibsRouter.get('/', securityMiddleware.sanitizeQueryString, nibsService.index);

// POST
nibsRouter.post(
  '/admin/',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  securityMiddleware.sanitizeQueryString,
  nibsService.adminIndex,
);

nibsRouter.post('/', nibsService.insert);

module.exports = nibsRouter;
