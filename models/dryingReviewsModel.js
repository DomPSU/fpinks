const db = require('./db');
const sqlUtil = require('../utils/sql');

const partialSQL =
  'SELECT DryingReviews.writing_sample_id, Users.user_id, Users.username, DryingReviews.drying_time, DryingReviews.created_at, DryingReviews.updated_at, DryingReviews.approved FROM DryingReviews LEFT JOIN Users ON Users.user_id=DryingReviews.user_id WHERE';

const show = async (data) => {
  const dbRes = await db.pool.asyncQuery(
    `${partialSQL} writing_sample_id=? AND Users.user_id=?;`,
    [data.writingSampleID, data.userID],
  );

  return dbRes;
};

const index = async (queryKeys, queryValues) => {
  const sanitizedSQL = sqlUtil.getSanitizedSQL(
    partialSQL,
    queryKeys,
    queryValues,
  );

  const dbRes = await db.pool.asyncQuery(sanitizedSQL);
  return dbRes;
};

const insert = async (data) => {
  const dbRes = await db.pool.asyncQuery(
    'INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
    [
      data.writingSampleID,
      data.userID,
      data.dryingTime.toLowerCase(),
      1,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
    ],
  );

  return dbRes;
};

const remove = async (data) => {
  const dbRes = await db.pool.asyncQuery(
    'DELETE FROM DryingReviews WHERE writing_sample_id = ? AND user_id = ?',
    [data.writingSampleID, data.userID],
  );

  return dbRes;
};

const update = async (data) => {
  const dbRes = await db.pool.asyncQuery(
    'UPDATE DryingReviews SET approved = ?, updated_at = ? WHERE user_id = ? AND writing_sample_id = ?',
    [
      data.approved,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      data.userID,
      data.writingSampleID,
    ],
  );
  return dbRes;
};

module.exports = {
  show,
  index,
  insert,
  remove,
  update,
};
