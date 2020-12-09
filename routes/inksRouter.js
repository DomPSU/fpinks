const express = require('express');
const {
  show,
  index,
  adminIndex,
  update,
  insert,
} = require('../services/inksService');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const inksRouter = express.Router();

// GET
inksRouter.get('/:id', show);
inksRouter.get('/', sanitizeQueryString, index);

// POST
inksRouter.post('/admin/', isAuth, isAdmin, sanitizeQueryString, adminIndex);

inksRouter.post('/edit/:id', isAuth, isAdmin, update);

inksRouter.post('/', insert);

module.exports = inksRouter;
