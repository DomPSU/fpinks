const papersModel = require('../models/papersModel');

const index = async (req, res, next) => {
  let data;
  try {
    data = await papersModel.index();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  let data;
  const { id } = req.params;

  try {
    data = await papersModel.show(id);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

// get approved/unapproved pens
const isApprovedIndex = async (req, res, next) => {
  const { approved } = req.params;
  try {
    const data = await papersModel.isApprovedIndex(approved);
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
    const data = await papersModel.insert(pen);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  index,
  isApprovedIndex,
  insert,
  show,
};
