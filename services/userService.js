const usersModel = require('../models/usersModel');

const index = async (req, res, next) => {
  let data;
  try {
    data = await usersModel.index();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  index,
};
