const db = require('./db');

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM WritingSamples WHERE approved <> 0',
  );
  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM WritingSamples WHERE approved = 0',
  );
  return res;
};

const insert = async (data) => {
  const res = await db.pool.asyncQuery(data);
  return res;
};

module.exports = {
  index,
  unapprovedIndex,
  insert,
};
