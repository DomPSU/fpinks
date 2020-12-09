const express = require('express');
const {
  show,
  index,
  adminIndex,
  insert,
  search,
} = require('../controllers/writingSamplesController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');
const AWS = require('../config/aws'); // TODO env based

const { upload } = AWS; // TODO env based

// const upload = multer({ dest: 'uploads/' }); // TODO env based

const writingSamplesRouter = express.Router();

// GET

// TODO make sure search is secure. Might need to add middleware.
// Might need to remove middleware. Might need to refactor search.
// Might need to sanitize search
writingSamplesRouter.get('/search/:query', sanitizeQueryString, search);
writingSamplesRouter.get('/search/', sanitizeQueryString, search);
writingSamplesRouter.get('/:id', show);
writingSamplesRouter.get('/', sanitizeQueryString, index);

// POST
writingSamplesRouter.post(
  '/admin/',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  adminIndex,
);

writingSamplesRouter.post('/', upload.single('writingSampleImage'), insert);

// TODO update

module.exports = writingSamplesRouter;
