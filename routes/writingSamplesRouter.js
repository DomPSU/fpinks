const express = require('express');
const writingSamplesService = require('../services/writingSamplesService');

const userRouter = express.Router();

userRouter.get('/', writingSamplesService.getAll);

module.exports = userRouter;
