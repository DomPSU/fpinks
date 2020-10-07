const db = require('./db');
const sqlUtil = require('../utils/sql');

const index = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT Pens.brand, Pens.model, Nibs.size, Nibs.grind, Nibs.tune, PenNibs.created_at, PenNibs.updated_at FROM PenNibs LEFT JOIN Pens ON PenNibs.pen_id = Pens.pen_id LEFT JOIN Nibs ON PenNibs.nib_id = Nibs.nib_id WHERE PenNibs.approved = 1 AND';

  const sanitizedSQL = sqlUtil.getSanitizedSQL(
    partialSQL,
    queryKeys,
    queryValues,
  );

  const res = await db.pool.asyncQuery(sanitizedSQL);
  return res;
};

const adminIndex = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT PenNibs.pen_id, Pens.brand, Pens.model, PenNibs.nib_id, Nibs.size, Nibs.grind, Nibs.tune, PenNibs.approved, PenNibs.created_at, PenNibs.updated_at FROM PenNibs LEFT JOIN Pens ON PenNibs.pen_id = Pens.pen_id LEFT JOIN Nibs ON PenNibs.nib_id = Nibs.nib_id WHERE';

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

  // search database for penNib
  const selectRes = await db.pool.asyncQuery(
    'SELECT * FROM PenNibs WHERE pen_id = ? AND nib_id = ?',
    [data.penID, data.nibID],
  );

  // insert penNib if it doesnt exist
  if (selectRes.length === 0) {
    const insertRes = await db.pool.asyncQuery(
      'INSERT INTO PenNibs (pen_id, nib_id, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [
        data.penID,
        data.nibID,
        0,
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      ],
    );
    console.log(insertRes);
    return insertRes;
  }

  // return penNib if it already exists
  if (selectRes.length === 1) {
    console.log(selectRes);
    return selectRes;
  }

  if (selectRes.length >= 2) {
    throw Object.assign(new Error('duplicate penNib in database'), {
      code: 500,
    });
  }
};

module.exports = {
  index,
  adminIndex,
  insert,
};
