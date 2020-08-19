const db = require('./db');

const getAll = async () => {
  const data = await db.pool.asyncQuery('SELECT * FROM Users');
  data.forEach((user) => {
    delete user.password;
  });
  return data;
};

module.exports = {
  getAll,
};
