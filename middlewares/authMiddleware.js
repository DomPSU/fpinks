const createError = require('http-errors');
const google = require('../config/google');
const usersModel = require('../models/usersModel');

const isAuth = async (req, res, next) => {
  let idToken = req.headers.authorization;

  if (idToken === undefined) {
    return next(
      createError(
        401,
        'Unauthorized. Please send jwt in Authorization header.',
      ),
    );
  }

  idToken = idToken.substring(7); // strip off "Bearer " from jwt

  let ticket;
  try {
    ticket = await google.verify(idToken);
  } catch (err) {
    return next(createError(401, 'Unauthorized. Please send valid jwt.'));
  }

  const subAndIss = {
    sub: ticket.getPayload().sub,
    iss: ticket.getPayload().iss,
  };

  let user;
  try {
    user = await usersModel.getUserFromSubAndIss(subAndIss);
  } catch (err) {
    return next(err);
  }

  res.locals.user = {
    id: user.user_id,
    email: user.email,
    username: user.username,
    sub: user.sub,
    iss: user.iss,
    level: user.level,
    approved: user.approved,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  next();
};

const isAdmin = async (req, res, next) => {
  if (res.locals.user === undefined || res.locals.user.level === undefined) {
    return next(
      createError(
        500,
        'Need to use isAuth middleware before checking if admin.',
      ),
    );
  }

  if (res.locals.user.level !== 'admin') {
    return next(createError(403, 'Forbidden. Not an admin.'));
  }

  next();
};

module.exports = {
  isAuth,
  isAdmin,
};
