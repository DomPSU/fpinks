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
usersRouter.get('/level', isAuth, isAdmin, validAdmin);
usersRouter.get('/:id', show);
usersRouter.get('/', sanitizeQueryString, index);

// POST
usersRouter.post('/', insert);

// TODO why is this different from other adminIndex? /admin/:approved and isApprovedIndex are both different
usersRouter.post('/admin/:approved', isAuth, isAdmin, isApprovedIndex);

module.exports = usersRouter;
