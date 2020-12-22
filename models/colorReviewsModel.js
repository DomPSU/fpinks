const db = require('./db');
const { getSanitizedSQL } = require('../utils/sql');

const partialSQL =
  'SELECT ColorReviews.writing_sample_id, ColorReviews.user_id, ColorReviews.color_id, Users.username, Colors.name AS color, ColorReviews.created_at, ColorReviews.updated_at, ColorReviews.approved FROM ColorReviews LEFT JOIN Users ON Users.user_id=ColorReviews.user_id LEFT JOIN Colors ON Colors.color_id=ColorReviews.color_id WHERE';

const show = async (data) => {
  const dbRes = await db.pool.asyncQuery(
    `${partialSQL} writing_sample_id=? AND Users.user_id=?;`,
    [data.writingSampleID, data.userID],
  );

  return dbRes;
};

const index = async (queryKeys, queryValues) => {
  const sanitizedSQL = getSanitizedSQL(partialSQL, queryKeys, queryValues);

  const dbRes = await db.pool.asyncQuery(sanitizedSQL);
  return dbRes;
};

const insert = async (data) => {
  const colorNameQuery = await db.pool.asyncQuery(
    'SELECT color_id FROM Colors WHERE name=?',
    [data.color],
  );

  const colorID = colorNameQuery[0].color_id;

  const dbRes = await db.pool.asyncQuery(
    'INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
    [
      data.writingSampleID,
      data.userID,
      colorID,
      1,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
    ],
  );

  return dbRes;
};

const remove = async (data) => {
  const dbRes = await db.pool.asyncQuery(
    'DELETE FROM ColorReviews WHERE writing_sample_id = ? AND user_id = ?',
    [data.writingSampleID, data.userID],
  );

  return dbRes;
};

const update = async (data) => {
  const dbRes = await db.pool.asyncQuery(
    'UPDATE ColorReviews SET approved = ?, updated_at = ? WHERE user_id = ? AND color_id = ? AND writing_sample_id = ?',
    [
      data.approved,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      data.userID,
      data.colorID,
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
