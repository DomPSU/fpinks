const express = require('express');
const {
  show,
  index,
  update,
  insert,
} = require('../controllers/pensController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const pensRouter = express.Router();

// GET
pensRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  processQueryString,
  index,
);
pensRouter.get('/:id', show);
pensRouter.get('/', sanitizeQueryString, processQueryString, index);

// POST
pensRouter.post('/', isAuth, isAdmin, insert);

// PUT
pensRouter.put('/edit/:id', isAuth, isAdmin, update);

module.exports = pensRouter;
