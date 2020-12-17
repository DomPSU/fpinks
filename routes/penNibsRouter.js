const express = require('express');
const { index, insert, update } = require('../controllers/penNibsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const {
  sanitizeQueryString,
  processQueryString,
} = require('../middlewares/queryStringMiddleware');

const penNibsRouter = express.Router();

penNibsRouter.get('/', sanitizeQueryString, processQueryString, index);
penNibsRouter.post('/', isAuth, isAdmin, insert);
penNibsRouter.put('/edit', isAuth, isAdmin, update);

module.exports = penNibsRouter;
