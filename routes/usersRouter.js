const express = require('express');
const usersService = require('../services/usersService');

const usersRouter = express.Router();

// GET
usersRouter.get('/unapproved', usersService.unapprovedIndex);
usersRouter.get('/:id', usersService.show);
usersRouter.get('/', usersService.index);

// POST
usersRouter.post('/', usersService.insert);

module.exports = usersRouter;
