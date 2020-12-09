const express = require('express');
const {
  show,
  index,
  adminIndex,
  update,
  insert,
} = require('../services/pensService');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const pensRouter = express.Router();

// GET
pensRouter.get('/:id', show);
pensRouter.get('/', sanitizeQueryString, index);

// POST
pensRouter.post('/admin/', isAuth, isAdmin, sanitizeQueryString, adminIndex);

pensRouter.post('/edit/:id', isAuth, isAdmin, update);

pensRouter.post('/', insert);

module.exports = pensRouter;
