const express = require('express');
const usersRouter = require('./usersRouter');
const writingSamplesRouter = require('./writingSamplesRouter');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/writing-samples', writingSamplesRouter);

module.exports = router;
