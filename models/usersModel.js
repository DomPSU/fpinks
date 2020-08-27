const db = require('./db');

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM Users WHERE approved <> 0',
  );
  res.forEach((user) => {
    delete user.password;
  });
  return res;
};

const show = async (id) => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM Users WHERE user_id = ? ',
    [id],
  );

  res.forEach((user) => {
    delete user.password;
  });
  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM Users WHERE approved = 0',
  );
  res.forEach((user) => {
    delete user.password;
  });
  return res;
};

module.exports = {
  index,
  unapprovedIndex,
  show,
};
