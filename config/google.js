const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verify = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    return ticket;
  } catch (err) {
    throw new Error();
  }
};

const getInsertCredentials = (ticket) => {
  const payload = ticket.getPayload();

  const validatedUser = {};

  validatedUser.sub = payload.sub;
  validatedUser.iss = payload.iss;
  validatedUser.email = payload.email;

  return validatedUser;
};

module.exports = {
  verify,
  getInsertCredentials,
};
