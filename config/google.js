const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  return ticket;
}
verify().catch(console.error);

async function getAdminCredentials(ticket) {
  const payload = ticket.getPayload();

  const validatedUser = {};

  validatedUser.sub = payload.sub;
  validatedUser.iss = payload.iss;

  return validatedUser;
}

async function getInsertCredentials(ticket) {
  const payload = ticket.getPayload();

  const validatedUser = {};

  validatedUser.sub = payload.sub;
  validatedUser.iss = payload.iss;
  validatedUser.email = payload.email;

  return validatedUser;
}

module.exports = {
  verify,
  getAdminCredentials,
  getInsertCredentials,
};
