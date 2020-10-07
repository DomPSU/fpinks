const mysql = require('mysql');
const db = require('./db');
const sqlUtil = require('../utils/sql');

const index = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT brand, model, created_at, updated_at FROM Pens WHERE Pens.approved=1 AND';

  const inserts = sqlUtil.getIndexInserts(queryKeys, queryValues);

  const unsanitizedSQL = sqlUtil.concatStringQueryInserts(
    partialSQL,
    queryKeys.length,
  );

  const sanitizedSQL = mysql.format(unsanitizedSQL, inserts);

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

  const inserts = sqlUtil.getIndexInserts(queryKeys, queryValues);

  const unsanitizedSQL = sqlUtil.concatStringQueryInserts(
    partialSQL,
    queryKeys.length,
  );

  const sanitizedSQL = mysql.format(unsanitizedSQL, inserts);

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

module.exports = {
  index,
  insert,
  show,
  adminIndex,
};
