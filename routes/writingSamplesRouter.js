const express = require('express');
const writingSamplesService = require('../services/writingSamplesService');
const authService = require('../services/authService');
const AWS = require('../config/aws'); // TODO env based

const { upload } = AWS; // TODO env based

// const upload = multer({ dest: 'uploads/' }); // TODO env based

const writingSamplesRouter = express.Router();

// GET
writingSamplesRouter.get('/search/:query', writingSamplesService.search);
writingSamplesRouter.get('/search/', writingSamplesService.search);
writingSamplesRouter.get('/:id', writingSamplesService.show);
writingSamplesRouter.get('/', writingSamplesService.index);

// POST
writingSamplesRouter.post(
  '/admin/:approved',
  authService.isUser,
  authService.isAdmin,
  writingSamplesService.isApprovedIndex,
);

writingSamplesRouter.post(
  '/',
  upload.single('writingSampleImage'),
  writingSamplesService.insert,
);

module.exports = writingSamplesRouter;
