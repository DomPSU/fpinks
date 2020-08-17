const userModel = require('../models/userModel');

const getAll = async (req, res, next) => {
  let data;
  try {
    data = await userModel.getAll();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
};
