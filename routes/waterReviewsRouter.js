const express = require('express');
const { index, insert } = require('../controllers/waterReviewsController');
const { isAuth, isAdmin } = require('../middlewares/authMiddleware');
const { sanitizeQueryString } = require('../middlewares/queryStringMiddleware');

const waterReviewsRouter = express.Router();

// GET
waterReviewsRouter.get('/admin', isAuth, isAdmin, sanitizeQueryString, index);
// TODO show
waterReviewsRouter.get('/', sanitizeQueryString, index);

// POST
waterReviewsRouter.post('/', isAuth, insert);

// TODO PUT

module.exports = waterReviewsRouter;
