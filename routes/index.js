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
const sheenReviewsRouter = require('./sheenReviewsRouter');
const featheringReviewsRouter = require('./featheringReviewsRouter');
const waterReviewsRouter = require('./waterReviewsRouter');
const dryingReviewsRouter = require('./dryingReviewsRouter');
const transparencyReviewsRouter = require('./transparencyReviewsRouter');

router.use('/users', usersRouter);
router.use('/pens', pensRouter);
router.use('/nibs', nibsRouter);
router.use('/pen-nibs', penNibsRouter);
router.use('/inks', inksRouter);
router.use('/papers', papersRouter);
router.use('/writing-samples', writingSamplesRouter);
router.use('/color-reviews', colorReviewsRouter);
router.use('/shading-reviews', shadingReviewsRouter);
router.use('/sheen-reviews', sheenReviewsRouter);
router.use('/feathering-reviews', featheringReviewsRouter);
router.use('/water-reviews', waterReviewsRouter);
router.use('/drying-reviews', dryingReviewsRouter);
router.use('/transparency-reviews', transparencyReviewsRouter);

module.exports = router;
