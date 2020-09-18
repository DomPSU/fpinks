const db = require('./db');
const awsUrls = require('../utils/awsUrls');

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT FeatheringReviews.writing_sample_id, WritingSamples.high_res_aws_key, FeatheringReviews.user_id, Users.username, FeatheringReviews.amount, FeatheringReviews.approved, FeatheringReviews.created_at, FeatheringReviews.updated_at FROM FeatheringReviews LEFT JOIN Users ON Users.user_id=FeatheringReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=FeatheringReviews.writing_sample_id WHERE FeatheringReviews.approved <> 0',
  );

  await awsUrls.addHighResUrls(res);

  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT FeatheringReviews.writing_sample_id, WritingSamples.high_res_aws_key, FeatheringReviews.user_id, Users.username, FeatheringReviews.amount, FeatheringReviews.approved, FeatheringReviews.created_at, FeatheringReviews.updated_at FROM FeatheringReviews LEFT JOIN Users ON Users.user_id=FeatheringReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=FeatheringReviews.writing_sample_id WHERE FeatheringReviews.approved = 0',
  );
  await awsUrls.addHighResUrls(res);

  return res;
};

const show = async (writingSampleID) => {
  const res = await db.pool.asyncQuery(
    'SELECT FeatheringReviews.writing_sample_id, WritingSamples.high_res_aws_key, FeatheringReviews.user_id, Users.username, FeatheringReviews.amount, FeatheringReviews.approved, FeatheringReviews.created_at, FeatheringReviews.updated_at FROM FeatheringReviews LEFT JOIN Users ON Users.user_id=FeatheringReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=FeatheringReviews.writing_sample_id WHERE WritingSamples.writing_sample_id=? AND FeatheringReviews.approved <> 0',
    [writingSampleID],
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

module.exports = {
  index,
  unapprovedIndex,
  insert,
  show,
  remove,
};
