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

  // validate google id token
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const validatedUser = {};

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: user.idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    validatedUser.sub = payload.sub;
    validatedUser.iss = payload.iss;
    validatedUser.email = payload.email;
  }
  verify().catch(console.error);

  // TODO check if invalid user gets to this code

  // insert new user
  try {
    const data = await usersModel.insert(user);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }

  // send http only cookie to front end
};

module.exports = {
  index,
  unapprovedIndex,
  show,
  insert,
};
