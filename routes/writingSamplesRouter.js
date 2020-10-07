const express = require('express');
const writingSamplesService = require('../services/writingSamplesService');
const authMiddleware = require('../middlewares/authMiddleware');
const securityMiddleware = require('../middlewares/securityMiddleware');
const AWS = require('../config/aws'); // TODO env based

const { upload } = AWS; // TODO env based

// const upload = multer({ dest: 'uploads/' }); // TODO env based

const writingSamplesRouter = express.Router();

// GET

// TODO make sure search is secure. Might need to add middleware.
// Might need to remove middleware. Might need to refactor search.
// Might need to sanitize search
writingSamplesRouter.get(
  '/search/:query',
  securityMiddleware.sanitizeQueryString,
  writingSamplesService.search,
);
writingSamplesRouter.get(
  '/search/',
  securityMiddleware.sanitizeQueryString,
  writingSamplesService.search,
);
writingSamplesRouter.get('/:id', writingSamplesService.show);
writingSamplesRouter.get(
  '/',
  securityMiddleware.sanitizeQueryString,
  writingSamplesService.index,
);

// POST
writingSamplesRouter.post(
  '/admin/',
  authMiddleware.isUser,
  authMiddleware.isAdmin,
  securityMiddleware.sanitizeQueryString,
  writingSamplesService.adminIndex,
);

writingSamplesRouter.post(
  '/',
  upload.single('writingSampleImage'),
  writingSamplesService.insert,
);

module.exports = writingSamplesRouter;
