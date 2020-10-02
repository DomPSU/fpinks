const db = require('./db');

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT Pens.brand, Pens.model, Nibs.size, Nibs.grind, Nibs.tune, PenNibs.created_at, PenNibs.updated_at FROM PenNibs LEFT JOIN Pens On PenNibs.pen_id = Pens.pen_id LEFT JOIN Nibs on PenNibs.nib_id = Nibs.nib_id WHERE PenNibs.approved <> 0',
  );
  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT Pens.brand, Pens.model, Nibs.size, Nibs.grind, Nibs.tune, PenNibs.created_at, PenNibs.updated_at FROM PenNibs LEFT JOIN Pens On PenNibs.pen_id = Pens.pen_id LEFT JOIN Nibs on PenNibs.nib_id = Nibs.nib_id WHERE PenNibs.approved = 0',
  );
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
  unapprovedIndex,
  insert,
};
