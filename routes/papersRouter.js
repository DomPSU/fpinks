const express = require('express');
const papersService = require('../services/papersService');
const authMiddleware = require('../middlewares/authMiddleware');
const securityMiddleware = require('../middlewares/securityMiddleware');

const papersRouter = express.Router();

// GET
papersRouter.get('/:id', papersService.show);
papersRouter.get(
  '/',
  securityMiddleware.sanitizeQueryString,
  papersService.index,
);

// POST
papersRouter.post(
  '/admin/',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  securityMiddleware.sanitizeQueryString,
  papersService.adminIndex,
);

papersRouter.post('/', papersService.insert);

module.exports = papersRouter;
