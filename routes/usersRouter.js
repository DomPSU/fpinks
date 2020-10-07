const express = require('express');
const usersService = require('../services/usersService');
const authMiddleware = require('../middlewares/authMiddleware');

const usersRouter = express.Router();

// GET
usersRouter.get('/:id', usersService.show);
usersRouter.get('/', usersService.index);

// POST
usersRouter.post('/', usersService.insert);

usersRouter.post(
  '/admin?',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  usersService.isAdmin,
);

usersRouter.post(
  '/admin/:approved',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  usersService.isApprovedIndex,
);

module.exports = usersRouter;
