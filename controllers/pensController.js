const pensModel = require('../models/pensModel');

const index = async (req, res, next) => {
  const queryKeys = res.locals.queryKeys || [];
  const queryValues = res.locals.queryValues || [];

  try {
    const data = await pensModel.index(queryKeys, queryValues);
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

const adminIndex = async (req, res, next) => {
  const queryKeys = res.locals.queryKeys || [];
  const queryValues = res.locals.queryValues || [];

  try {
    const data = await pensModel.adminIndex(queryKeys, queryValues);
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
  adminIndex,
  update,
};
