const express = require('express');
const writingSamplesService = require('../services/writingSamplesService');
const AWS = require('../config/aws'); // TODO env based

const { upload } = AWS; // TODO env based

// const upload = multer({ dest: 'uploads/' }); // TODO env based

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
