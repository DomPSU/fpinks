const createError = require('http-errors');
const { nibSizes, nibGrinds, nibTunes, paperStyles } = require('../constants');

const validateWritingSample = (req, res, next) => {
  const {
    penBrand,
    penModel,
    nibSize,
    nibGrind,
    nibTune,
    inkBrand,
    inkName,
    paperBrand,
    paperName,
    paperStyle,
    comment,
  } = req.body;

  if (req.file === undefined || req.file.key === undefined) {
    return next(createError(400, 'Writing Sample image is required.'));
  }

  const fileName = req.file.key;

  if (
    penBrand === undefined ||
    penModel === undefined ||
    nibSize === undefined ||
    nibGrind === undefined ||
    nibTune === undefined ||
    inkBrand === undefined ||
    inkName === undefined ||
    paperBrand === undefined ||
    paperStyle === undefined
  ) {
    return next(createError(400, 'No undefined values.'));
  }

  if (typeof penBrand !== 'string') {
    return next(createError(400, 'Pen brand must be a string.'));
  }

  if (penBrand.length > 100) {
    return next(createError(400, 'Pen brand must be 100 characters or less.'));
  }

  if (typeof penModel !== 'string') {
    return next(createError(400, 'Pen Model must be a string.'));
  }

  if (penModel.length > 255) {
    return next(createError(400, 'Pen Model must be 255 characters or less.'));
  }

  if (typeof inkBrand !== 'string') {
    return next(createError(400, 'Ink Brand must be a string.'));
  }

  if (inkBrand.length > 100) {
    return next(createError(400, 'Ink Brand must be 100 characters or less.'));
  }

  if (typeof inkName !== 'string') {
    return next(createError(400, 'Ink Name must be a string.'));
  }

  if (inkName.length > 100) {
    return next(createError(400, 'Ink Name must be 100 characters or less.'));
  }

  if (typeof paperBrand !== 'string') {
    return next(createError(400, 'Paper Brand must be a string.'));
  }

  if (paperBrand.length > 100) {
    return next(
      createError(400, 'Paper Brand must be 100 characters or less.'),
    );
  }

  if (paperName !== undefined) {
    if (typeof paperName !== 'string') {
      return next(createError(400, 'Paper Name must be a string.'));
    }

    if (paperName.length > 100) {
      return next(
        createError(400, 'Paper Name must be 100 characters or less.'),
      );
    }
  }

  if (comment !== undefined) {
    if (typeof comment !== 'string') {
      return next(createError(400, 'Comment must be a string.'));
    }

    if (paperBrand.length > 1024) {
      return next(createError(400, 'Comment must be 1024 characters or less.'));
    }
  }

  if (typeof fileName !== 'string') {
    return next(createError(400, 'File Name must be a string.'));
  }

  if (fileName.length > 900) {
    return next(createError(400, 'File Name must be 900 characters or less.'));
  }

  if (typeof nibSize !== 'string') {
    return next(createError(400, 'Nib Size must be a string.'));
  }

  if (!nibSizes.includes(nibSize.toLowerCase())) {
    return next(
      createError(
        400,
        `Nib Size must equal one of the following non case-sensitive choices: ${nibSizes.join(
          ', ',
        )}.`,
      ),
    );
  }

  if (typeof nibGrind !== 'string') {
    return next(createError(400, 'Nib Grind must be a string.'));
  }

  if (!nibGrinds.includes(nibGrind.toLowerCase())) {
    return next(
      createError(
        400,
        `Nib Grind must equal one of the following non case-sensitive choices: ${nibGrinds.join(
          ', ',
        )}.`,
      ),
    );
  }

  if (typeof nibTune !== 'string') {
    return next(createError(400, 'Nib Tune must be a string.'));
  }

  if (!nibTunes.includes(nibTune.toLowerCase())) {
    return next(
      createError(
        400,
        `Nib Tune must equal one of the following non case-sensitive choices: ${nibTunes.join(
          ', ',
        )}.`,
      ),
    );
  }

  if (typeof paperStyle !== 'string') {
    return next(createError(400, 'Paper Style must be a string.'));
  }

  if (!paperStyles.includes(paperStyle.toLowerCase())) {
    return next(
      createError(
        400,
        `Paper Style must equal one of the following non case-sensitive choices: ${paperStyles.join(
          ', ',
        )}.`,
      ),
    );
  }

  next();
};

module.exports = {
  validateWritingSample,
};
