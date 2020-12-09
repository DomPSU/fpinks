const express = require('express');
const {
  show,
  index,
  update,
  insert,
} = require('../controllers/papersController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const papersRouter = express.Router();

// GET
papersRouter.get(
  '/admin/',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  processQueryString,
  index,
);
papersRouter.get('/:id', show);
papersRouter.get('/', sanitizeQueryString, processQueryString, index);

// POST
papersRouter.post('/', isAuth, isAdmin, insert);

// PUT
papersRouter.put('/edit/:id', isAuth, isAdmin, update);

module.exports = papersRouter;
