const db = require('./db');
const sqlUtil = require('../utils/sql');

const index = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT SheenReviews.writing_sample_id, Users.username, Users.user_id, Colors.color_id AS color_id, Colors.name AS color, SheenReviews.amount, SheenReviews.created_at, SheenReviews.updated_at, SheenReviews.approved FROM SheenReviews LEFT JOIN Users ON Users.user_id=SheenReviews.user_id LEFT JOIN Colors ON Colors.color_id=SheenReviews.color_id WHERE';

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

  // get colorID from color name
  const colorNameQuery = await db.pool.asyncQuery(
    'SELECT color_id FROM Colors WHERE name=?',
    [data.color],
  );

  const colorID = colorNameQuery[0].color_id;

  const insertRes = await db.pool.asyncQuery(
    'INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      data.writingSampleID,
      data.userID,
      colorID,
      data.amount.toLowerCase(),
      0,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
    ],
  );

  return insertRes;
};

const remove = async (data) => {
  // remove existing sheen review if it exists
  const deleteRes = await db.pool.asyncQuery(
    'DELETE FROM SheenReviews WHERE writing_sample_id = ? AND user_id = ?',
    [data.writingSampleID, data.userID],
  );

  return deleteRes;
};

const update = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  const updateRes = await db.pool.asyncQuery(
    'UPDATE SheenReviews SET approved = ?, updated_at = ? WHERE user_id = ? AND color_id = ? AND writing_sample_id = ?',
    [
      data.approved,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      data.userID,
      data.colorID,
      data.writingSampleID,
    ],
  );
  return updateRes;
};

module.exports = {
  index,
  insert,
  remove,
  update,
};
