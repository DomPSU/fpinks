const express = require('express');
const multer = require('multer');
const writingSamplesService = require('../services/writingSamplesService');

const upload = multer({ dest: 'uploads/' });

const writingSamplesRouter = express.Router();

// GET
writingSamplesRouter.get('/', writingSamplesService.index);
writingSamplesRouter.get('/unapproved', writingSamplesService.unapprovedIndex);

// POST
writingSamplesRouter.post(
  '/',
  upload.single('writingSampleImage'),
  writingSamplesService.insert,
);

module.exports = writingSamplesRouter;
