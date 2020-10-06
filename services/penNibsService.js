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

// get approved/unapproved pens
const isApprovedIndex = async (req, res, next) => {
  const { approved } = req.params;
  try {
    const data = await penNibsModel.isApprovedIndex(approved);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const penNib = {
    ...req.body,
  };

  try {
    const data = await penNibsModel.insert(penNib);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  index,
  isApprovedIndex,
  insert,
};
