const db = require('./db');

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM Inks WHERE approved <> 0',
  );
  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery('SELECT * FROM Inks WHERE approved = 0');
  return res;
};

const insert = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  // search database for ink
  const selectRes = await db.pool.asyncQuery(
    'SELECT * FROM Inks WHERE brand = ? AND model = ? AND name = ?',
    [data.inkBrand, data.inkModel, data.inkName],
  );

  // insert ink if it doesnt exist
  if (selectRes.length === 0) {
    const insertRes = await db.pool.asyncQuery(
      'INSERT INTO Inks (brand, model, name, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
      [
        data.inkBrand.toLowerCase(),
        data.inkModel.toLowerCase(),
        data.inkName.toLowerCase(),
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
    throw Object.assign(new Error('duplicate ink in database'), { code: 500 });
  }
};

module.exports = {
  index,
  unapprovedIndex,
  insert,
};

// TODO move parts of validation to controller (services)
// TODO new Date().toISOString().replace('T', ' ').replace('Z', ' ') HACK
