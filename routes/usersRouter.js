const express = require('express');
const {
  show,
  index,
  insert,
  update,
  validAdmin,
} = require('../controllers/usersController');
const { setAuth, isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const usersRouter = express.Router();

usersRouter.get('/level', setAuth, isAuth, isAdmin, validAdmin); // TODO HACK
usersRouter.get('/:id', show);
usersRouter.get('/', sanitizeQueryString, processQueryString, index);
usersRouter.post('/', insert);
usersRouter.put('/edit/:id', isAuth, isAdmin, update);

module.exports = usersRouter;
