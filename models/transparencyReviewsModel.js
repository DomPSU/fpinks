const db = require('./db');
const AWS = require('../config/aws');

const addUrlsToRes = async (res) => {
  res.forEach(
    // TODO fix es lint error and use await instead of then?
    (transparencyReviews) =>
      AWS.getURL(transparencyReviews.high_res_aws_key).then(
        // eslint-disable-next-line no-return-assign
        (highResUrl) => (transparencyReviews.high_res_url = highResUrl),
      ),
  );
};

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT TransparencyReviews.writing_sample_id, WritingSamples.high_res_aws_key, TransparencyReviews.user_id, Users.username, TransparencyReviews.transparency, TransparencyReviews.approved, TransparencyReviews.created_at, TransparencyReviews.updated_at FROM TransparencyReviews LEFT JOIN Users ON Users.user_id=TransparencyReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=TransparencyReviews.writing_sample_id WHERE TransparencyReviews.approved <> 0',
  );
  await addUrlsToRes(res);
  res.forEach((transparencyReview) => {
    delete transparencyReview.high_res_aws_key;
  });
  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT TransparencyReviews.writing_sample_id, WritingSamples.high_res_aws_key, TransparencyReviews.user_id, Users.username, TransparencyReviews.transparency, TransparencyReviews.approved, TransparencyReviews.created_at, TransparencyReviews.updated_at FROM TransparencyReviews LEFT JOIN Users ON Users.user_id=TransparencyReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=TransparencyReviews.writing_sample_id WHERE TransparencyReviews.approved = 0',
  );
  await addUrlsToRes(res);
  res.forEach((transparencyReview) => {
    delete transparencyReview.high_res_aws_key;
  });
  return res;
};

const show = async (writingSampleID) => {
  const res = await db.pool.asyncQuery(
    'SELECT TransparencyReviews.writing_sample_id, WritingSamples.high_res_aws_key, TransparencyReviews.user_id, Users.username, TransparencyReviews.transparency, TransparencyReviews.approved, TransparencyReviews.created_at, TransparencyReviews.updated_at FROM TransparencyReviews LEFT JOIN Users ON Users.user_id=TransparencyReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=TransparencyReviews.writing_sample_id WHERE WritingSamples.writing_sample_id=? AND TransparencyReviews.approved <> 0',
    [writingSampleID],
  );
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
  unapprovedIndex,
  insert,
  show,
  remove,
};
