const express = require('express');

const router = express.Router();
const usersRouter = require('./usersRouter');
const pensRouter = require('./pensRouter');
const nibsRouter = require('./nibsRouter');
const penNibsRouter = require('./penNibsRouter');
const inksRouter = require('./inksRouter');
const papersRouter = require('./papersRouter');
const writingSamplesRouter = require('./writingSamplesRouter');
const colorReviewsRouter = require('./colorReviewsRouter');
const shadingReviewsRouter = require('./shadingReviewsRouter');

router.use('/users', usersRouter);
router.use('/pens', pensRouter);
router.use('/nibs', nibsRouter);
router.use('/pen-nibs', penNibsRouter);
router.use('/inks', inksRouter);
router.use('/papers', papersRouter);
router.use('/writing-samples', writingSamplesRouter);
router.use('/color-reviews', colorReviewsRouter);
router.use('/shading-reviews', shadingReviewsRouter);

module.exports = router;
