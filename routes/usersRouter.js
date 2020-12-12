const express = require('express');
const {
  show,
  index,
  insert,
  validAdmin,
} = require('../controllers/usersController');
const { setAuth, isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const usersRouter = express.Router();

// GET
usersRouter.get('/level', setAuth, isAuth, isAdmin, validAdmin); // TODO HACK
usersRouter.get('/:id', show);
usersRouter.get('/', sanitizeQueryString, processQueryString, index);
usersRouter.post('/', insert);

module.exports = usersRouter;
