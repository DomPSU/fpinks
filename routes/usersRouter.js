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
  '/admin/:approved',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  usersService.isApprovedIndex,
);

usersRouter.post(
  '/admin',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  usersService.validAdmin,
);

module.exports = usersRouter;
