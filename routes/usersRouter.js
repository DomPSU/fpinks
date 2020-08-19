const express = require('express');
const usersService = require('../services/usersService');

const usersRouter = express.Router();

usersRouter.get('/', usersService.getAll);

module.exports = usersRouter;
