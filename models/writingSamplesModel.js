const db = require('./db');

const getAll = async () => {
  const data = await db.pool.asyncQuery('SELECT * FROM WritingSamples');
  return data;
};

module.exports = {
  getAll,
};
