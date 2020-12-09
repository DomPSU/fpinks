const penNibsModel = require('../models/penNibsModel');

const index = async (req, res, next) => {
  const queryKeys = res.locals.queryKeys || [];
  const queryValues = res.locals.queryValues || [];

  try {
    const data = await penNibsModel.index(queryKeys, queryValues);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const adminIndex = async (req, res, next) => {
  const queryKeys = res.locals.queryKeys || [];
  const queryValues = res.locals.queryValues || [];

  try {
    const data = await penNibsModel.adminIndex(queryKeys, queryValues);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const penNib = {
    ...req.body,
  };

  try {
    const data = await penNibsModel.insert(penNib);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  index,
  adminIndex,
  insert,
};
