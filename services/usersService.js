const usersModel = require('../models/usersModel');
const google = require('../config/google');

const index = async (req, res, next) => {
  let data;
  try {
    data = await usersModel.index();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  let data;
  const { id } = req.params;

  try {
    data = await usersModel.show(id);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const isApprovedIndex = async (req, res, next) => {
  const { approved } = req.params;
  try {
    const data = await usersModel.isApprovedIndex(approved);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const user = {
    ...req.body,
  };

  // get validated user from idToken
  async function verify() {
    const ticket = await google.verify(user.idToken);
    const insertCredentials = await google.getInsertCredentials(ticket);

    // insert new validated user
    try {
      await usersModel.insert(insertCredentials);
      res.status(200).end();
    } catch (e) {
      next(e);
    }
  }
  verify().catch(console.error);
};

const validAdmin = async (req, res, next) => {
  res.status(200).end();
};

module.exports = {
  index,
  isApprovedIndex,
  show,
  insert,
  validAdmin,
};
