const express = require('express');
const {
  show,
  index,
  update,
  insert,
} = require('../controllers/nibsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const nibsRouter = express.Router();

// GET
nibsRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  processQueryString,
  index,
);
nibsRouter.get('/:id', show);
nibsRouter.get('/', sanitizeQueryString, processQueryString, index);

// POST
nibsRouter.post('/', isAuth, isAdmin, insert);

// PUT
nibsRouter.put('/edit/:id', isAuth, isAdmin, update);

module.exports = nibsRouter;
