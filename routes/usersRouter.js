const express = require('express');
const {
  show,
  index,
  insert,
  validAdmin,
} = require('../controllers/usersController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const usersRouter = express.Router();

// GET
usersRouter.get('/level', isAuth, isAdmin, validAdmin);
usersRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  processQueryString,
  index,
);
usersRouter.get('/:id', show);
usersRouter.get('/', sanitizeQueryString, processQueryString, index);

// POST
usersRouter.post('/', insert);

module.exports = usersRouter;
