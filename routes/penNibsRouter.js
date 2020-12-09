const express = require('express');
const { index, insert } = require('../controllers/penNibsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const penNibsRouter = express.Router();

// GET
penNibsRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  sanitizeQueryString,
  processQueryString,
  index,
);
// TODO show
penNibsRouter.get('/', sanitizeQueryString, processQueryString, index);

// POST
penNibsRouter.post('/', isAuth, isAdmin, insert);

// TODO PUT

module.exports = penNibsRouter;
