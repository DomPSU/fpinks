const db = require('./db');
const sqlUtil = require('../utils/sql');

const index = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT brand, model, created_at, updated_at FROM Pens WHERE Pens.approved=1 AND';

  const sanitizedSQL = sqlUtil.getSanitizedSQL(
    partialSQL,
    queryKeys,
    queryValues,
  );

  const res = await db.pool.asyncQuery(sanitizedSQL);
  return res;
};

const show = async (id) => {
  const res = await db.pool.asyncQuery(
    'SELECT brand, model, created_at, updated_at FROM Pens WHERE pen_id = ?',
    [id],
  );
  return res;
};

const adminIndex = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT pen_id, brand, model, approved, created_at, updated_at FROM Pens WHERE';

  const sanitizedSQL = sqlUtil.getSanitizedSQL(
    partialSQL,
    queryKeys,
    queryValues,
  );

  const res = await db.pool.asyncQuery(sanitizedSQL);
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

  // return pen if it already exists
  if (selectRes.length === 1) {
    console.log(selectRes);
    return selectRes;
  }

  if (selectRes.length >= 2) {
    throw Object.assign(new Error('duplicate pen in database'), { code: 500 });
  }
};

const update = async (id, data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  const updateRes = await db.pool.asyncQuery(
    'UPDATE Pens SET brand = ?, model = ?, approved = ?, updated_at = ? WHERE pen_id = ?',
    [
      data.penBrand.toLowerCase(),
      data.penModel.toLowerCase(),
      data.approved,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      id,
    ],
  );
  console.log(updateRes);
  return updateRes;
};

module.exports = {
  index,
  insert,
  show,
  adminIndex,
  update,
};
