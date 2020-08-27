const express = require('express');
const multer = require('multer');
const writingSamplesService = require('../services/writingSamplesService');

const upload = multer({ dest: 'uploads/' });

const writingSamplesRouter = express.Router();

// GET
writingSamplesRouter.get('/unapproved', writingSamplesService.unapprovedIndex);
writingSamplesRouter.get('/:id', writingSamplesService.show);
writingSamplesRouter.get('/', writingSamplesService.index);

// POST
writingSamplesRouter.post(
  '/',
  upload.single('writingSampleImage'),
  writingSamplesService.insert,
);

module.exports = writingSamplesRouter;
