const usersModel = require('../models/usersModel');
const google = require('../config/google');

const index = async (req, res, next) => {
  try {
    const data = await usersModel.index(
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
    data = await usersModel.show(id);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const user = {
    ...req.body,
  };

  async function verify() {
    const ticket = await google.verify(user.idToken);
    const insertCredentials = await google.getInsertCredentials(ticket);

    try {
      const dbRes = await usersModel.insert(insertCredentials);

      res.status(200).send(dbRes);
    } catch (e) {
      next(e);
    }
  }
  verify().catch(console.error);
};

const update = async (req, res, next) => {
  const user = {
    ...req.body,
    userID: req.params.id,
  };

  try {
    const data = await usersModel.update(user);
    res.statusMessage = 'Update succesful.';
    res.status(200).send(data);
  } catch (e) {
    res.status(400).end();
    next(e);
  }
};

const validAdmin = async (req, res, next) => {
  res.status(200).end();
};

module.exports = {
  index,
  show,
  insert,
  update,
  validAdmin,
};
