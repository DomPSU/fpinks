const db = require('./db');

const index = async () => {
  const data = await db.pool.asyncQuery(
    'SELECT * FROM Users WHERE approved <> 0',
  );
  data.forEach((user) => {
    delete user.password;
  });
  return data;
};

const unapprovedIndex = async () => {
  const data = await db.pool.asyncQuery(
    'SELECT * FROM Users WHERE approved = 0',
  );
  data.forEach((user) => {
    delete user.password;
  });
  return data;
};

module.exports = {
  index,
  unapprovedIndex,
};
