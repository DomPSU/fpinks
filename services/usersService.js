const usersModel = require('../models/usersModel');

const getAll = async (req, res, next) => {
  let data;
  try {
    data = await usersModel.getAll();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
};
