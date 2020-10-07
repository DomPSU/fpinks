const usersModel = require('../models/usersModel');
const google = require('../config/google');
const util = require('../utils/util');

const isUser = async (req, res, next) => {
  if (util.isDevelopment() === true) {
    next();
    return;
  }

  const { idToken } = req.body;

  // get validated user from id token
  try {
    const ticket = await google.verify(idToken);
    res.locals.ticket = ticket;
    next();
  } catch (e) {
    // send 401 unauthorized status if user is not logged in
    console.log('401 unauthorized.');
    res.status(401).end();
  }
};

const isAdmin = async (req, res, next) => {
  if (util.isDevelopment() === true) {
    next();
    return;
  }

  // check if user was verified
  try {
    if (typeof res.locals.ticket === 'undefined') {
      throw new Error();
    }
  } catch (e) {
    console.log('401 unauthorized. Verify if user before verifying if admin.');
    res.status(401).end();
    return;
  }

  // check if admin
  try {
    const adminCredentials = await google.getAdminCredentials(
      res.locals.ticket,
    );
    const validAdmin = await usersModel.isAdmin(adminCredentials);

    // send 403 forbidden status if admin credentials invalid
    if (!validAdmin) {
      throw new Error();
    }
    res.locals.admin = true;

    next();
  } catch (e) {
    console.log('403 forbidden not admin');
    res.status(403).end();
  }
};

module.exports = {
  isUser,
  isAdmin,
};
