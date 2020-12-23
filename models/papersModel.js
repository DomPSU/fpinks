const db = require('./db');
const sqlUtil = require('../utils/sql');

const partialSQL =
  'SELECT paper_id, brand, name, style, lbs, grams, created_at, updated_at, approved FROM Papers WHERE';

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
  const res = await db.pool.asyncQuery(`${partialSQL} paper_id = ?`, [id]);
  return res;
};

const insert = async (data) => {
  let { paperName } = data;

  if (paperName) {
    paperName = paperName.toLowerCase();
  }

  let selectRes;

  if (paperName) {
    selectRes = await db.pool.asyncQuery(
      'SELECT * FROM Papers WHERE brand = ? AND name = ? AND style = ?',
      [data.paperBrand, data.paperName, data.paperStyle],
    );
  } else {
    selectRes = await db.pool.asyncQuery(
      'SELECT * FROM Papers WHERE brand = ? AND name is NULL AND style = ?',
      [data.paperBrand, data.paperStyle],
    );
  }

  // insert paper if it doesnt exist
  if (selectRes.length === 0) {
    const insertRes = await db.pool.asyncQuery(
      'INSERT INTO Papers (brand, name, style, lbs, grams, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        data.paperBrand.toLowerCase(),
        paperName,
        data.paperStyle.toLowerCase(),
        null,
        null,
        0,
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      ],
    );

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
  insert,
  show,
  update,
};
