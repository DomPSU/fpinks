const mysql = require('mysql');
const db = require('./db');
const sqlUtil = require('../utils/sql');

const index = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT size, grind, tune, created_at, updated_at FROM Nibs WHERE Nibs.approved=1 AND';

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
    'SELECT size, grind, tune, created_at, updated_at FROM Nibs WHERE nib_id = ? ',
    [id],
  );
  return res;
};

const adminIndex = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT nib_id, size, grind, tune, approved, created_at, updated_at FROM Nibs WHERE';

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
  if (selectRes.length === 1) {
    return selectRes;
  }

  // TODO this should probably still insert, I could maybe use approved numbers
  // for status codes but then I would have to put approved = 1 instead of approved <>0
  if (selectRes.length >= 2) {
    throw Object.assign(new Error('duplicate nib in database'), { code: 500 });
  }
};

module.exports = {
  index,
  adminIndex,
  insert,
  show,
};
