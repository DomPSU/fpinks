const inksModel = require('../models/inksModel');

const index = async (req, res, next) => {
  let data;
  try {
    data = await inksModel.index();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  let data;
  const { id } = req.params;

  try {
    data = await inksModel.show(id);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

// get approved/unapproved pens
const isApprovedIndex = async (req, res, next) => {
  const { approved } = req.params;
  try {
    const data = await inksModel.isApprovedIndex(approved);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const ink = {
    ...req.body,
  };

  try {
    const data = await inksModel.insert(ink);
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
