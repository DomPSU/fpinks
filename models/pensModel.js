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

const insert = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  // search database for pen
  const selectRes = await db.pool.asyncQuery(
    'SELECT * FROM Pens WHERE brand = ? AND model = ?',
    [data.penBrand, data.penModel],
  );

  // insert pen if it doesnt exist
  if (selectRes.length === 0) {
    const insertRes = await db.pool.asyncQuery(
      'INSERT INTO Pens (brand, model, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [
        data.penBrand.toLowerCase(),
        data.penModel.toLowerCase(),
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
    throw Object.assign(new Error('duplicate pen in database'), { code: 500 });
  }
};

module.exports = {
  index,
  unapprovedIndex,
  insert,
};
