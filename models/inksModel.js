const db = require('./db');
const sqlUtil = require('../utils/sql');

const partialSQL =
  'SELECT ink_id, brand, name, created_at, updated_at, approved FROM Inks WHERE';

const index = async (queryKeys, queryValues) => {
  const sanitizedSQL = sqlUtil.getSanitizedSQL(
    partialSQL,
    queryKeys,
    queryValues,
  );

  const res = await db.pool.asyncQuery(sanitizedSQL);
  return res;
};

const show = async (id) => {
  const res = await db.pool.asyncQuery(`${partialSQL} ink_id = ?`, [id]);
  return res;
};

const insert = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  // search database for ink
  const selectRes = await db.pool.asyncQuery(
    'SELECT * FROM Inks WHERE brand = ? AND name = ?',
    [data.inkBrand, data.inkName],
  );

  // insert ink if it doesnt exist
  if (selectRes.length === 0) {
    const insertRes = await db.pool.asyncQuery(
      'INSERT INTO Inks (brand, name, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [
        data.inkBrand.toLowerCase(),
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
  if (selectRes.length === 1) {
    console.log(selectRes);
    return selectRes;
  }

  if (selectRes.length >= 2) {
    throw Object.assign(new Error('duplicate ink in database'), { code: 500 });
  }
};

const update = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  const updateRes = await db.pool.asyncQuery(
    'UPDATE Inks SET brand = ?, name = ?, approved = ?, updated_at = ? WHERE ink_id = ?',
    [
      data.inkBrand.toLowerCase(),
      data.inkName.toLowerCase(),
      data.approved,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      data.inkID,
    ],
  );
  console.log(updateRes);
  return updateRes;
};

module.exports = {
  index,
  insert,
  show,
  update,
};

// TODO move parts of validation to controller (services)
