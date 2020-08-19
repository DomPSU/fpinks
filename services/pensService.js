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

const unapprovedIndex = async (req, res, next) => {
  let data;
  try {
    data = await pensModel.unapprovedIndex();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  index,
  unapprovedIndex,
};
