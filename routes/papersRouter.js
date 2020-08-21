const express = require('express');
const papersService = require('../services/papersService');

const papersRouter = express.Router();

// GET
papersRouter.get('/', papersService.index);
papersRouter.get('/unapproved', papersService.unapprovedIndex);

// POST
papersRouter.post('/', papersService.insert);

module.exports = papersRouter;
