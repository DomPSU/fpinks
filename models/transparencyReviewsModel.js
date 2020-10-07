const db = require('./db');
const sqlUtil = require('../utils/sql');
const awsUrls = require('../utils/awsUrls');

const index = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT TransparencyReviews.writing_sample_id, Users.username, TransparencyReviews.transparency, TransparencyReviews.created_at, TransparencyReviews.updated_at FROM TransparencyReviews LEFT JOIN Users ON Users.user_id=TransparencyReviews.user_id WHERE TransparencyReviews.approved=1 AND';

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
    'SELECT TransparencyReviews.writing_sample_id, Users.username, TransparencyReviews.transparency, TransparencyReviews.approved, TransparencyReviews.created_at, TransparencyReviews.updated_at, WritingSamples.high_res_aws_key FROM TransparencyReviews LEFT JOIN Users ON Users.user_id=TransparencyReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=TransparencyReviews.writing_sample_id WHERE';

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
    'INSERT INTO TransparencyReviews (writing_sample_id, user_id, transparency, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
    [
      data.writingSampleID,
      data.userID,
      data.transparency.toLowerCase(),
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
    'DELETE FROM TransparencyReviews WHERE writing_sample_id = ? AND user_id = ?',
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
