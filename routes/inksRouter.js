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

inksRouter.get('/:id', show);
inksRouter.get('/', sanitizeQueryString, processQueryString, index);
inksRouter.post('/', isAuth, isAdmin, insert);
inksRouter.put('/edit/:id', isAuth, isAdmin, update);

module.exports = inksRouter;
