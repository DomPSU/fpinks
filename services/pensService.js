const pensModel = require('../models/pensModel');

const index = async (req, res, next) => {
  let data;
  try {
    data = await pensModel.index();
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

const isApprovedIndex = async (req, res, next) => {
  const { approved } = req.params;
  try {
    const data = await pensModel.isApprovedIndex(approved);
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
  isApprovedIndex,
};
