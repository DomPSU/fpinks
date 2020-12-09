const express = require('express');
const {
  show,
  index,
  update,
  insert,
} = require('../controllers/inksController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const inksRouter = express.Router();

// GET
inksRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  processQueryString,
  index,
);
inksRouter.get('/:id', show);
inksRouter.get('/', sanitizeQueryString, processQueryString, index);

// POST
inksRouter.post('/', isAuth, isAdmin, insert);

// PUT
inksRouter.put('/edit/:id', isAuth, isAdmin, update);

module.exports = inksRouter;
