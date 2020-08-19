const express = require('express');
const usersService = require('../services/usersService');

const usersRouter = express.Router();

// GET
usersRouter.get('/', usersService.index);
usersRouter.get('/unapproved', usersService.unapprovedIndex);

module.exports = usersRouter;
