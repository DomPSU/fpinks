const express = require('express');

const router = express.Router();
const usersRouter = require('./usersRouter');
const writingSamplesRouter = require('./writingSamplesRouter');
const inksRouter = require('./inksRouter');

router.use('/users', usersRouter);
router.use('/writing-samples', writingSamplesRouter);
router.use('/inks', inksRouter);

module.exports = router;
