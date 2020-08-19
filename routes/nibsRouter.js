const express = require('express');
const nibsService = require('../services/nibsService');

const nibsRouter = express.Router();

// GET
nibsRouter.get('/', nibsService.index);
nibsRouter.get('/unapproved', nibsService.unapprovedIndex);

// POST
nibsRouter.post('/', nibsService.insert);

module.exports = nibsRouter;
