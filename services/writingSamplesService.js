const writingSamplesModel = require('../models/writingSamplesModel');

const getAll = async (req, res, next) => {
  let data;
  try {
    data = await writingSamplesModel.getAll();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
};
