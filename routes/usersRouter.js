const express = require('express');
const {
  show,
  index,
  insert,
  isApprovedIndex,
  validAdmin,
} = require('../controllers/usersController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const usersRouter = express.Router();

// GET
usersRouter.get('/:id', show);
usersRouter.get('/', index); // TODO sanitize query string?

// POST
usersRouter.post('/', insert);

usersRouter.post('/admin/:approved', isAuth, isAdmin, isApprovedIndex);

usersRouter.post('/admin', isAuth, isAdmin, validAdmin);

module.exports = usersRouter;
