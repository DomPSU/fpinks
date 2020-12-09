const express = require('express');
const { index, insert } = require('../controllers/penNibsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const penNibsRouter = express.Router();

// GET
penNibsRouter.get('/admin', isAuth, isAdmin, sanitizeQueryString, index);
// TODO show
penNibsRouter.get('/', sanitizeQueryString, index);

// POST
penNibsRouter.post('/', isAuth, isAdmin, insert);

// TODO PUT

module.exports = penNibsRouter;
