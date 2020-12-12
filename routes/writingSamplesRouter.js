const express = require('express');
const {
  show,
  index,
  insert,
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

// TODO make sure search is secure. Might need to add middleware.
// Might need to remove middleware. Might need to refactor search.
// Might need to sanitize search
writingSamplesRouter.get('/search/:query', sanitizeQueryString, search);
writingSamplesRouter.get('/search', sanitizeQueryString, search);
writingSamplesRouter.get('/:id', show);
writingSamplesRouter.get('/', sanitizeQueryString, processQueryString, index);
writingSamplesRouter.post(
  '/',
  isAuth,
  upload.single('writingSampleImage'),
  insert,
);

module.exports = writingSamplesRouter;
