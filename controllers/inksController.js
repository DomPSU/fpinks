const inksModel = require('../models/inksModel');

const index = async (req, res, next) => {
  try {
    const data = await inksModel.index(
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
    data = await inksModel.show(id);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const ink = {
    ...req.body,
  };

  try {
    const data = await inksModel.insert(ink);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const ink = {
    ...req.body,
  };

  ink.inkID = id;

  try {
    const data = await inksModel.update(ink);
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
