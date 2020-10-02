const db = require('./db');
const awsUrls = require('../utils/awsUrls');

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT DryingReviews.writing_sample_id, Users.username, DryingReviews.drying_time, DryingReviews.created_at, DryingReviews.updated_at FROM DryingReviews LEFT JOIN Users ON Users.user_id=DryingReviews.user_id WHERE DryingReviews.approved <> 0',
  );
  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT DryingReviews.writing_sample_id, WritingSamples.high_res_aws_key, DryingReviews.user_id, Users.username, DryingReviews.drying_time, DryingReviews.approved, DryingReviews.created_at, DryingReviews.updated_at FROM DryingReviews LEFT JOIN Users ON Users.user_id=DryingReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=DryingReviews.writing_sample_id WHERE DryingReviews.approved = 0',
  );
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
  unapprovedIndex,
  insert,
  show,
  remove,
};
