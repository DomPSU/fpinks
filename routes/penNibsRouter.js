const express = require('express');
const penNibsService = require('../services/penNibsService');

const penNibsRouter = express.Router();

// GET
penNibsRouter.get('/', penNibsService.index);
penNibsRouter.get('/unapproved', penNibsService.unapprovedIndex);

// POST
penNibsRouter.post('/', penNibsService.insert);

module.exports = penNibsRouter;
