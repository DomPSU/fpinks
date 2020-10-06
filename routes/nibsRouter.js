const express = require('express');
const nibsService = require('../services/nibsService');
const authService = require('../services/authService');

const nibsRouter = express.Router();

// GET
nibsRouter.get('/:id', nibsService.show);
nibsRouter.get('/', nibsService.index);

// POST
nibsRouter.post(
  '/admin/:approved',
  authService.isUser,
  authService.isAdmin,
  nibsService.isApprovedIndex,
);

nibsRouter.post('/', nibsService.insert);

module.exports = nibsRouter;
