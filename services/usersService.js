const { OAuth2Client } = require('google-auth-library');
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

const unapprovedIndex = async (req, res, next) => {
  let data;
  try {
    data = await usersModel.unapprovedIndex();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  const user = {
    ...req.body,
  };

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const validatedUser = {};

  // get validated user from idToken
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: user.idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    validatedUser.sub = payload.sub;
    validatedUser.iss = payload.iss;
    validatedUser.email = payload.email;

    // insert new validated user
    try {
      await usersModel.insert(validatedUser);
      res.status(200).end();
    } catch (e) {
      next(e);
    }
  }
  verify().catch(console.error);
};

const isAdmin = async (req, res, next) => {
  const user = {
    ...req.body,
  };

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const validatedUser = {};

  // get validated user from idToken
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: user.idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    validatedUser.sub = payload.sub;
    validatedUser.iss = payload.iss;

    // check if admin
    try {
      const isAdminRes = await usersModel.isAdmin(validatedUser);
      res.status(200).send({ isAdmin: isAdminRes });
    } catch (e) {
      next(e);
    }
  }
  verify().catch(console.error);
};

module.exports = {
  index,
  unapprovedIndex,
  show,
  insert,
  isAdmin,
};
