const db = require('./db');
const sqlUtil = require('../utils/sql');

const partialSQL =
  'SELECT FeatheringReviews.writing_sample_id, Users.user_id, Users.username, FeatheringReviews.amount, FeatheringReviews.created_at, FeatheringReviews.updated_at FROM FeatheringReviews LEFT JOIN Users ON Users.user_id=FeatheringReviews.user_id WHERE';

const index = async (queryKeys, queryValues) => {
  const sanitizedSQL = sqlUtil.getSanitizedSQL(
    partialSQL,
    queryKeys,
    queryValues,
  );

  const res = await db.pool.asyncQuery(sanitizedSQL);
  return res;
};

const show = async (data) => {
  const res = await db.pool.asyncQuery(
    `${partialSQL} FeatheringReviews.writing_sample_id = ? AND Users.user_id = ?`,
    [data.writingSampleID, data.userID],
  );

  return res;
};

const insert = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  const insertRes = await db.pool.asyncQuery(
    'INSERT INTO FeatheringReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
    [
      data.writingSampleID,
      data.userID,
      data.amount.toLowerCase(),
      0,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
    ],
  );

  return insertRes;
};

const remove = async (data) => {
  // remove existing feathering review if it exists
  const deleteRes = await db.pool.asyncQuery(
    'DELETE FROM FeatheringReviews WHERE writing_sample_id = ? AND user_id = ?',
    [data.writingSampleID, data.userID],
  );

  return deleteRes;
};

const update = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON
  const updateRes = await db.pool.asyncQuery(
    'UPDATE FeatheringReviews SET approved = ?, updated_at = ? WHERE user_id = ? AND writing_sample_id = ?',
    [
      data.approved,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      data.userID,
      data.writingSampleID,
    ],
  );
  return updateRes;
};

module.exports = {
  index,
  show,
  insert,
  remove,
  update,
};
