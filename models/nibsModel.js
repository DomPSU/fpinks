const db = require('./db');

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM Nibs WHERE approved <> 0',
  );
  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery('SELECT * FROM Nibs WHERE approved = 0');
  return res;
};

const insert = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  // search database for nib
  const selectRes = await db.pool.asyncQuery(
    'SELECT * FROM Nibs WHERE size = ? AND grind = ? AND tune = ?',
    [data.nibSize, data.nibGrind, data.nibTune],
  );

  // insert nib if it doesnt exist
  if (selectRes.length === 0) {
    const insertRes = await db.pool.asyncQuery(
      'INSERT INTO Nibs (size, grind, tune, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
      [
        data.nibSize.toLowerCase(),
        data.nibGrind.toLowerCase(),
        data.nibTune.toLowerCase(),
        0,
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      ],
    );
    console.log(insertRes);
    return insertRes;
  }

  // return ink if it already exists
  if (selectRes.legnth === 1) {
    console.log(selectRes);
    return selectRes;
  }

  if (selectRes.length >= 2) {
    throw Object.assign(new Error('duplicate nib in database'), { code: 500 });
  }
};

module.exports = {
  index,
  unapprovedIndex,
  insert,
};
