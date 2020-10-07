const nibsModel = require('../models/nibsModel');

const index = async (req, res, next) => {
  const queryKeys = Object.keys(req.query);
  const queryValues = Object.values(req.query);
  try {
    const data = await nibsModel.index(queryKeys, queryValues);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  let data;
  const { id } = req.params;

  try {
    data = await nibsModel.show(id);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const adminIndex = async (req, res, next) => {
  const queryKeys = Object.keys(req.query);
  const queryValues = Object.values(req.query);
  try {
    const data = await nibsModel.adminIndex(queryKeys, queryValues);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const nib = {
    ...req.body,
  };

  try {
    const data = await nibsModel.insert(nib);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  index,
  adminIndex,
  insert,
  show,
};
