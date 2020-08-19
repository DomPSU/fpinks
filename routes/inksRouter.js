const express = require('express');
const inksService = require('../services/inksService');

const inksRouter = express.Router();

// GET
inksRouter.get('/', inksService.index);
inksRouter.get('/unapproved', inksService.unapprovedIndex);

// POST
inksRouter.post('/', inksService.insert);

module.exports = inksRouter;
