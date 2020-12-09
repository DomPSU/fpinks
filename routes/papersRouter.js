const express = require('express');
const {
  show,
  index,
  adminIndex,
  update,
  insert,
} = require('../controllers/papersController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const papersRouter = express.Router();

// GET
papersRouter.get('/:id', show);
papersRouter.get('/', sanitizeQueryString, index);

// POST
papersRouter.post('/admin/', isAuth, isAdmin, sanitizeQueryString, adminIndex);

papersRouter.post('/edit/:id', isAuth, isAdmin, update);

papersRouter.post('/', insert);

module.exports = papersRouter;
