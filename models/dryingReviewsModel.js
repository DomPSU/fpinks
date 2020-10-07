const db = require('./db');
const sqlUtil = require('../utils/sql');
const awsUrls = require('../utils/awsUrls');

const index = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT DryingReviews.writing_sample_id, Users.username, DryingReviews.drying_time, DryingReviews.created_at, DryingReviews.updated_at FROM DryingReviews LEFT JOIN Users ON Users.user_id=DryingReviews.user_id WHERE DryingReviews.approved=1 AND';

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
    'SELECT DryingReviews.writing_sample_id, Users.username, DryingReviews.drying_time, DryingReviews.approved, DryingReviews.created_at, DryingReviews.updated_at, WritingSamples.high_res_aws_key FROM DryingReviews LEFT JOIN Users ON Users.user_id=DryingReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=DryingReviews.writing_sample_id WHERE';

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
    'SELECT DryingReviews.writing_sample_id, Users.username, DryingReviews.drying_time, DryingReviews.created_at, DryingReviews.updated_at FROM DryingReviews LEFT JOIN Users ON Users.user_id=DryingReviews.user_id WHERE DryingReviews.writing_sample_id=? AND DryingReviews.approved <> 0',
    [writingSampleID],
  );
  return res;
};

const insert = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  const insertRes = await db.pool.asyncQuery(
    'INSERT INTO DryingReviews (writing_sample_id, user_id, drying_time, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
    [
      data.writingSampleID,
      data.userID,
      data.dryingTime.toLowerCase(),
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
    'DELETE FROM DryingReviews WHERE writing_sample_id = ? AND user_id = ?',
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
