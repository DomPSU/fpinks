const usersModel = require('../models/usersModel');
const google = require('../config/google');

const isUser = async (req, res, next) => {
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
  // check if user was verified
  if (typeof res.locals.ticket === 'undefined') {
    console.log(
      '401 unauthorized. Need to verify user before verifying if admin.',
    );
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
      console.log('403 forbidden');
      res.status(403).end();
      return;
    }
    res.locals.admin = true;

    next();
  } catch (e) {
    console.log('Admin check error.');
  }
};

module.exports = {
  isUser,
  isAdmin,
};
