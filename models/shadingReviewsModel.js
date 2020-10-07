const db = require('./db');
const sqlUtil = require('../utils/sql');
const awsUrls = require('../utils/awsUrls');

const index = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT ShadingReviews.writing_sample_id, Users.username, ShadingReviews.amount, ShadingReviews.created_at, ShadingReviews.updated_at FROM ShadingReviews LEFT JOIN Users ON Users.user_id=ShadingReviews.user_id WHERE ShadingReviews.approved = 1 AND';

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
    'SELECT ShadingReviews.amount, ShadingReviews.approved, ShadingReviews.created_at, ShadingReviews.updated_at, WritingSamples.high_res_aws_key FROM ShadingReviews LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id = ShadingReviews.writing_sample_id WHERE';

  const sanitizedSQL = sqlUtil.getSanitizedSQL(
    partialSQL,
    queryKeys,
    queryValues,
  );

  const res = await db.pool.asyncQuery(sanitizedSQL);

  await awsUrls.addHighResUrls(res);

  return res;
};

const show = async (writingSampleID) => {
  const res = await db.pool.asyncQuery(
    'SELECT ShadingReviews.writing_sample_id, Users.username, ShadingReviews.amount, ShadingReviews.created_at, ShadingReviews.updated_at FROM ShadingReviews LEFT JOIN Users ON Users.user_id=ShadingReviews.user_id WHERE ShadingReviews.writing_sample_id=? AND ShadingReviews.approved <> 0',
    [writingSampleID],
  );
  return res;
};

const insert = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  const insertRes = await db.pool.asyncQuery(
    'INSERT INTO ShadingReviews (writing_sample_id, user_id, amount, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
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
  // remove existing shading review if it exists
  const deleteRes = await db.pool.asyncQuery(
    'DELETE FROM ShadingReviews WHERE writing_sample_id = ? AND user_id = ?',
    [data.writingSampleID, data.userID],
  );

  return deleteRes;
};

module.exports = {
  index,
  adminIndex,
  insert,
  show,
  remove,
};
