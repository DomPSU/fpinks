const db = require('./db');
const sqlUtil = require('../utils/sql');
const awsUrls = require('../utils/awsUrls');

const index = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT ColorReviews.writing_sample_id, Users.username, Colors.name AS color, ColorReviews.created_at, ColorReviews.updated_at FROM ColorReviews LEFT JOIN Users ON Users.user_id=ColorReviews.user_id LEFT JOIN Colors ON Colors.color_id=ColorReviews.color_id WHERE ColorReviews.approved = 1 AND';

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
    'SELECT ColorReviews.writing_sample_id, Users.username, Users.user_id, Colors.color_id, Colors.name AS color, ColorReviews.approved, ColorReviews.created_at, ColorReviews.updated_at, WritingSamples.high_res_aws_key FROM ColorReviews LEFT JOIN Users ON Users.user_id=ColorReviews.user_id LEFT JOIN Colors ON Colors.color_id=ColorReviews.color_id LEFT JOIN WritingSamples ON ColorReviews.writing_sample_id = WritingSamples.writing_sample_id WHERE';

  const sanitizedSQL = sqlUtil.getSanitizedSQL(
    partialSQL,
    queryKeys,
    queryValues,
  );

  const res = await db.pool.asyncQuery(sanitizedSQL);

  await awsUrls.addHighResUrls(res);

  return res;
};

const insert = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  // get colorID from color name
  const colorNameQuery = await db.pool.asyncQuery(
    'SELECT color_id FROM Colors WHERE name=?',
    [data.colorName],
  );

  const colorID = colorNameQuery[0].color_id;

  const insertRes = await db.pool.asyncQuery(
    'INSERT INTO ColorReviews (writing_sample_id, user_id, color_id, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
    [
      data.writingSampleID,
      data.userID,
      colorID,
      0,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
    ],
  );

  return insertRes;
};

const remove = async (data) => {
  // remove existing color reviews if they exist
  const deleteRes = await db.pool.asyncQuery(
    'DELETE FROM ColorReviews WHERE writing_sample_id = ? AND user_id = ?',
    [data.writingSampleID, data.userID],
  );

  return deleteRes;
};

const update = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  const updateRes = await db.pool.asyncQuery(
    'UPDATE ColorReviews SET approved = ?, updated_at = ? WHERE user_id = ? AND color_id = ? and writing_sample_id = ?',
    [
      data.approved,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      data.userID,
      data.colorID,
      data.writingSampleID,
    ],
  );
  console.log(updateRes);
  return updateRes;
};

module.exports = {
  index,
  adminIndex,
  insert,
  remove,
  update,
};
