const express = require('express');
const papersService = require('../services/papersService');
const authMiddleware = require('../middlewares/authMiddleware');

const papersRouter = express.Router();

// GET
papersRouter.get('/:id', papersService.show);
papersRouter.get('/', papersService.index);

// POST
papersRouter.post(
  '/admin/:approved',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  papersService.isApprovedIndex,
);

papersRouter.post('/', papersService.insert);

module.exports = papersRouter;
