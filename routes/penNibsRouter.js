const express = require('express');
const penNibsService = require('../services/penNibsService');

const penNibsRouter = express.Router();

// GET
penNibsRouter.get('/unapproved', penNibsService.unapprovedIndex);
penNibsRouter.get('/', penNibsService.index);

// POST
penNibsRouter.post('/', penNibsService.insert);

module.exports = penNibsRouter;
