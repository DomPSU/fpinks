const nibsModel = require('../models/nibsModel');

const index = async (req, res, next) => {
  let data;
  try {
    data = await nibsModel.index();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const unapprovedIndex = async (req, res, next) => {
  let data;
  try {
    data = await nibsModel.unapprovedIndex();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  index,
  unapprovedIndex,
};
