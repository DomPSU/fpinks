const pensModel = require('../models/pensModel');

const index = async (req, res, next) => {
  try {
    const data = await pensModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await pensModel.show(id);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const pen = {
    ...req.body,
  };

  try {
    const data = await pensModel.insert(pen);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const pen = {
    ...req.body,
  };

  pen.penID = id;

  try {
    const data = await pensModel.update(pen);
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
