const express = require('express');
const pensService = require('../services/pensService');
const authService = require('../services/authService');

const pensRouter = express.Router();

// GET
pensRouter.get('/:id', pensService.show);
pensRouter.get('/', pensService.index);

// POST
pensRouter.post(
  '/admin/:approved',
  authService.isUser,
  authService.isAdmin,
  pensService.isApprovedIndex,
);

pensRouter.post('/', pensService.insert);

module.exports = pensRouter;
