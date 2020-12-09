const express = require('express');
const {
  show,
  index,
  adminIndex,
  update,
  insert,
} = require('../services/nibsService');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const nibsRouter = express.Router();

// GET
nibsRouter.get('/:id', show);
nibsRouter.get('/', sanitizeQueryString, index);

// POST
nibsRouter.post('/admin/', isAuth, isAdmin, sanitizeQueryString, adminIndex);

nibsRouter.post('/edit/:id', isAuth, isAdmin, update);

nibsRouter.post('/', insert);

module.exports = nibsRouter;
