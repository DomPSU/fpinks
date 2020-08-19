const express = require('express');

const router = express.Router();
const usersRouter = require('./usersRouter');
const writingSamplesRouter = require('./writingSamplesRouter');
const inksRouter = require('./inksRouter');
const pensRouter = require('./pensRouter');
const nibsRouter = require('./nibsRouter');
const penNibsRouter = require('./penNibsRouter');

router.use('/users', usersRouter);
router.use('/writing-samples', writingSamplesRouter);
router.use('/inks', inksRouter);
router.use('/pens', pensRouter);
router.use('/nibs', nibsRouter);
router.use('/pen-nibs', penNibsRouter);

module.exports = router;
