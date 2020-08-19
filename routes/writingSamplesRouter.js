const express = require('express');
const writingSamplesService = require('../services/writingSamplesService');

const writingSamplesRouter = express.Router();

// GET
writingSamplesRouter.get('/', writingSamplesService.index);
writingSamplesRouter.get('/unapproved', writingSamplesService.unapprovedIndex);

// POST
writingSamplesRouter.post('/', writingSamplesService.insert);

module.exports = writingSamplesRouter;
