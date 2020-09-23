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
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: user.idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload.sub;
    const email = payload[''];
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
  verify().catch(console.error);

  try {
    const data = await usersModel.insert(user);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  index,
  unapprovedIndex,
  show,
  insert,
};
