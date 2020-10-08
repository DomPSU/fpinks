const express = require('express');
const pensService = require('../services/pensService');
const authMiddleware = require('../middlewares/authMiddleware');
const securityMiddleware = require('../middlewares/securityMiddleware');

const pensRouter = express.Router();

// GET
pensRouter.get('/:id', pensService.show);
pensRouter.get('/', securityMiddleware.sanitizeQueryString, pensService.index);

// POST
pensRouter.post(
  '/admin/',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  securityMiddleware.sanitizeQueryString,
  pensService.adminIndex,
);

pensRouter.post(
  '/edit/:id',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  pensService.update,
);

pensRouter.post('/', pensService.insert);

module.exports = pensRouter;
