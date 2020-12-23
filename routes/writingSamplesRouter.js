const express = require('express');
const AWS = require('../config/aws');
const {
  show,
  index,
  insert,
  update,
  search,
} = require('../controllers/writingSamplesController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');
const {
  validateWritingSample,
} = require('../middlewares/writingSamplesMiddleware');

const { upload } = AWS;

const writingSamplesRouter = express.Router();

writingSamplesRouter.get(
  '/search/:query',
  sanitizeQueryString,
  processQueryString,
  search,
);
writingSamplesRouter.get(
  '/search',
  sanitizeQueryString,
  processQueryString,
  search,
);
writingSamplesRouter.get('/:id', show);
writingSamplesRouter.get('/', sanitizeQueryString, processQueryString, index);
writingSamplesRouter.post(
  '/',
  isAuth,
  upload.single('writingSampleImage'),
  validateWritingSample,
  insert,
);
writingSamplesRouter.put('/edit/:writingSampleID', isAuth, isAdmin, update);

module.exports = writingSamplesRouter;
