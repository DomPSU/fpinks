const express = require('express');
const papersService = require('../services/papersService');
const authService = require('../services/authService');

const papersRouter = express.Router();

// GET
papersRouter.get('/:id', papersService.show);
papersRouter.get('/', papersService.index);

// POST
papersRouter.post(
  '/admin/:approved',
  authService.isUser,
  authService.isAdmin,
  papersService.isApprovedIndex,
);

papersRouter.post('/', papersService.insert);

module.exports = papersRouter;
