const db = require('./db');
const sqlUtil = require('../utils/sql');

const partialSQL =
  'SELECT TransparencyReviews.writing_sample_id, Users.user_id, Users.username, TransparencyReviews.transparency, TransparencyReviews.created_at, TransparencyReviews.updated_at, TransparencyReviews.approved FROM TransparencyReviews LEFT JOIN Users ON Users.user_id=TransparencyReviews.user_id WHERE';

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
    'INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
    [
      data.writingSampleID,
      data.userID,
      data.transparency.toLowerCase(),
      1,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
    ],
  );

  return dbRes;
};

const remove = async (data) => {
  const dbRes = await db.pool.asyncQuery(
    'DELETE FROM TransparencyReviews WHERE writing_sample_id = ? AND user_id = ?',
    [data.writingSampleID, data.userID],
  );

  return dbRes;
};

const update = async (data) => {
  const dbRes = await db.pool.asyncQuery(
    'UPDATE TransparencyReviews SET approved = ?, updated_at = ? WHERE user_id = ? AND writing_sample_id = ?',
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
