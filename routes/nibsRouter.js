const express = require('express');
const nibsService = require('../services/nibsService');

const nibsRouter = express.Router();

// GET
nibsRouter.get('/unapproved', nibsService.unapprovedIndex);
nibsRouter.get('/:id', nibsService.show);
nibsRouter.get('/', nibsService.index);

// POST
nibsRouter.post('/', nibsService.insert);

module.exports = nibsRouter;
