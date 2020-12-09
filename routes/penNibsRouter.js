const express = require('express');
const {
  index,
  adminIndex,
  insert,
} = require('../controllers/penNibsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const penNibsRouter = express.Router();

// GET
// TODO show
penNibsRouter.get('/', sanitizeQueryString, index);

// POST
penNibsRouter.post('/admin/', isAuth, isAdmin, sanitizeQueryString, adminIndex);
penNibsRouter.post('/', insert);

// TODO update

module.exports = penNibsRouter;
