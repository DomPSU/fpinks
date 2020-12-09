const nibsModel = require('../models/nibsModel');

const index = async (req, res, next) => {
  try {
    const data = await nibsModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  let data;
  const { id } = req.params;

  try {
    data = await nibsModel.show(id);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const nib = {
    ...req.body,
  };

  try {
    const data = await nibsModel.insert(nib);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const nib = {
    ...req.body,
  };

  nib.nibID = id;

  try {
    const data = await nibsModel.update(nib);
    res.statusMessage = 'Update succesful.';
    res.status(200).send(data);
  } catch (e) {
    res.status(400).end();
    next(e);
  }
};

module.exports = {
  index,
  insert,
  show,
  update,
};
