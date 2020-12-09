const express = require('express');
const { index, insert } = require('../controllers/sheenReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const sheenReviewsRouter = express.Router();

// GET
sheenReviewsRouter.get('/admin', isAuth, isAdmin, sanitizeQueryString, index);
// TODO show
sheenReviewsRouter.get('/', sanitizeQueryString, index);

// POST
sheenReviewsRouter.post('/', isAuth, insert);

// TODO PUT

module.exports = sheenReviewsRouter;
