const db = require('./db');
const sqlUtil = require('../utils/sql');
const awsUrls = require('../utils/awsUrls');

const index = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT WaterReviews.writing_sample_id, Users.username, WaterReviews.waterproofness, WaterReviews.created_at, WaterReviews.updated_at FROM WaterReviews LEFT JOIN Users ON Users.user_id=WaterReviews.user_id WHERE WaterReviews.approved = 1 AND';

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
    'SELECT WaterReviews.writing_sample_id, Users.username, WaterReviews.waterproofness, WaterReviews.approved, WaterReviews.created_at, WaterReviews.updated_at, WritingSamples.high_res_aws_key FROM WaterReviews LEFT JOIN Users ON Users.user_id=WaterReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=WaterReviews.writing_sample_id WHERE';

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

  const insertRes = await db.pool.asyncQuery(
    'INSERT INTO WaterReviews (writing_sample_id, user_id, waterproofness, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
    [
      data.writingSampleID,
      data.userID,
      data.waterproofness.toLowerCase(),
      0,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
    ],
  );

  return insertRes;
};

const remove = async (data) => {
  // remove existing waterproofness review if it exists
  const deleteRes = await db.pool.asyncQuery(
    'DELETE FROM WaterReviews WHERE writing_sample_id = ? AND user_id = ?',
    [data.writingSampleID, data.userID],
  );

  return deleteRes;
};

module.exports = {
  index,
  adminIndex,
  insert,
  remove,
};
