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

const unapprovedIndex = async (req, res, next) => {
  let data;
  try {
    data = await inksModel.unapprovedIndex();
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
  unapprovedIndex,
  insert,
};
