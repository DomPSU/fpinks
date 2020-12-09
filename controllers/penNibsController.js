const penNibsModel = require('../models/penNibsModel');

const index = async (req, res, next) => {
  try {
    const data = await penNibsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );
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
  insert,
};
