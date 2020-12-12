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

nibsRouter.get('/:id', show);
nibsRouter.get('/', sanitizeQueryString, processQueryString, index);
nibsRouter.post('/', isAuth, isAdmin, insert);
nibsRouter.put('/edit/:id', isAuth, isAdmin, update);

module.exports = nibsRouter;
