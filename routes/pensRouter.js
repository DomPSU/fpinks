const express = require('express');
const pensService = require('../services/pensService');

const pensRouter = express.Router();

// GET
pensRouter.get('/unapproved', pensService.unapprovedIndex);
pensRouter.get('/:id', pensService.show);
pensRouter.get('/', pensService.index);

// POST
pensRouter.post('/', pensService.insert);

module.exports = pensRouter;
