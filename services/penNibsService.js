const penNibsModel = require('../models/penNibsModel');

const index = async (req, res, next) => {
  let data;
  try {
    data = await penNibsModel.index();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const unapprovedIndex = async (req, res, next) => {
  let data;
  try {
    data = await penNibsModel.unapprovedIndex();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  index,
  unapprovedIndex,
};
