const express = require('express');
const inksService = require('../services/inksService');

const inksRouter = express.Router();

// GET
inksRouter.get('/unapproved', inksService.unapprovedIndex);
inksRouter.get('/:id', inksService.show);
inksRouter.get('/', inksService.index);

// POST
inksRouter.post('/', inksService.insert);

module.exports = inksRouter;
