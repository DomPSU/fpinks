const express = require('express');
const { index, insert } = require('../controllers/penNibsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const penNibsRouter = express.Router();

// TODO show
penNibsRouter.get('/', sanitizeQueryString, processQueryString, index);
penNibsRouter.post('/', isAuth, isAdmin, insert);

// TODO PUT

module.exports = penNibsRouter;
