const db = require('./db');

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM Pens WHERE approved <> 0',
  );
  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery('SELECT * FROM Pens WHERE approved = 0');
  return res;
};

module.exports = {
  index,
  unapprovedIndex,
};
