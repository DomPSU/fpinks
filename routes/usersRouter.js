const express = require('express');
const usersService = require('../services/usersService');
const authService = require('../services/authService');

const usersRouter = express.Router();

// GET
usersRouter.get('/:id', usersService.show);
usersRouter.get('/', usersService.index);

// POST
usersRouter.post('/', usersService.insert);

usersRouter.post(
  '/admin?',
  authService.isUser,
  authService.isAdmin,
  usersService.isAdmin,
);

usersRouter.post(
  '/admin/:approved',
  authService.isUser,
  authService.isAdmin,
  usersService.isApprovedIndex,
);

module.exports = usersRouter;
