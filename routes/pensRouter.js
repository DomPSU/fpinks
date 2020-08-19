const express = require('express');
const pensService = require('../services/pensService');

const pensRouter = express.Router();

// GET
pensRouter.get('/', pensService.index);
pensRouter.get('/unapproved', pensService.unapprovedIndex);

// POST
pensRouter.post('/', pensService.insert);

module.exports = pensRouter;
