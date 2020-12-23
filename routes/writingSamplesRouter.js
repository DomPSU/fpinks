const express = require('express');
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
const AWS = require('../config/aws');

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
  insert,
);
writingSamplesRouter.put('/edit/:writingSampleID', isAuth, isAdmin, update);

module.exports = writingSamplesRouter;
