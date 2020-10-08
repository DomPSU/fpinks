const db = require('./db');
const sqlUtil = require('../utils/sql');

const index = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT brand, name, style, lbs, grams, created_at, updated_at FROM Papers WHERE approved=1 AND';

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
    'SELECT brand, name, style, lbs, grams, created_at, updated_at FROM Papers WHERE paper_id = ? ',
    [id],
  );
  return res;
};

const adminIndex = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT paper_id, brand, name, style, lbs, grams, approved, created_at, updated_at FROM Papers WHERE';

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

  // search database for paper
  const selectRes = await db.pool.asyncQuery(
    'SELECT * FROM Papers WHERE brand = ? AND name = ? AND style = ?', // TODO lbs/grams
    [data.paperBrand, data.paperName, data.paperStyle],
  );

  // insert paper if it doesnt exist
  if (selectRes.length === 0) {
    const insertRes = await db.pool.asyncQuery(
      'INSERT INTO Papers (brand, name, style, lbs, grams, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        data.paperBrand.toLowerCase(),
        data.paperName.toLowerCase(),
        data.paperStyle.toLowerCase(),
        null, // TODO
        null, // TODO
        0,
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      ],
    );
    console.log(insertRes);
    return insertRes;
  }

  // return paper if it already exists
  if (selectRes.length === 1) {
    console.log(selectRes);
    return selectRes;
  }

  // TODO make this submit and then fix later???
  if (selectRes.length >= 2) {
    throw Object.assign(new Error('duplicate paper in database'), {
      code: 500,
    });
  }
};

const update = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  const updateRes = await db.pool.asyncQuery(
    'UPDATE Papers SET brand = ?, name = ?, style = ?, lbs = ?, grams = ?, approved = ?, updated_at = ? WHERE paper_id = ?',
    [
      data.paperBrand.toLowerCase(),
      data.paperName.toLowerCase(),
      data.paperStyle.toLowerCase(),
      data.lbs,
      data.grams,
      data.approved,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      data.paperID,
    ],
  );
  console.log(updateRes);
  return updateRes;
};

module.exports = {
  index,
  adminIndex,
  insert,
  show,
  update,
};
