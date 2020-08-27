const express = require('express');
const papersService = require('../services/papersService');

const papersRouter = express.Router();

// GET
papersRouter.get('/unapproved', papersService.unapprovedIndex);
papersRouter.get('/:id', papersService.show);
papersRouter.get('/', papersService.index);

// POST
papersRouter.post('/', papersService.insert);

module.exports = papersRouter;
