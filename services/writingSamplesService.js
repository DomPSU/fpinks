const writingSamplesModel = require('../models/writingSamplesModel');

const index = async (req, res, next) => {
  let data;
  try {
    data = await writingSamplesModel.index();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const unapprovedIndex = async (req, res, next) => {
  let data;
  try {
    data = await writingSamplesModel.unapprovedIndex();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const writingSample = {
    ...req.body,
  };

  try {
    const data = await writingSamplesModel.insert(writingSample);
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
