const pensModel = require('../models/pensModel');

const index = async (req, res, next) => {
  const queryKeys = Object.keys(req.query);
  const queryValues = Object.values(req.query);
  try {
    const data = await pensModel.index(queryKeys, queryValues);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  let data;
  const { id } = req.params;
  try {
    data = await pensModel.show(id);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const adminIndex = async (req, res, next) => {
  const queryKeys = Object.keys(req.query);
  const queryValues = Object.values(req.query);
  try {
    const data = await pensModel.adminIndex(queryKeys, queryValues);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const pen = {
    ...req.body,
  };

  try {
    const data = await pensModel.insert(pen);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  index,
  insert,
  show,
  adminIndex,
};
