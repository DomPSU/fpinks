const db = require('./db');
const AWS = require('../config/aws');

const addUrlsToRes = async (res) => {
  res.forEach(
    // TODO fix es lint error and use await instead of then?
    (waterReviews) =>
      AWS.getURL(waterReviews.high_res_aws_key).then(
        // eslint-disable-next-line no-return-assign
        (highResUrl) => (waterReviews.high_res_url = highResUrl),
      ),
  );
};

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT WaterReviews.writing_sample_id, WritingSamples.high_res_aws_key, WaterReviews.user_id, Users.username, WaterReviews.waterproofness, WaterReviews.approved, WaterReviews.created_at, WaterReviews.updated_at FROM WaterReviews LEFT JOIN Users ON Users.user_id=WaterReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=WaterReviews.writing_sample_id WHERE WaterReviews.approved <> 0',
  );
  await addUrlsToRes(res);
  res.forEach((waterReview) => {
    delete waterReview.high_res_aws_key;
  });
  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT WaterReviews.writing_sample_id, WritingSamples.high_res_aws_key, WaterReviews.user_id, Users.username, WaterReviews.waterproofness, WaterReviews.approved, WaterReviews.created_at, WaterReviews.updated_at FROM WaterReviews LEFT JOIN Users ON Users.user_id=WaterReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=WaterReviews.writing_sample_id WHERE WaterReviews.approved = 0',
  );
  await addUrlsToRes(res);
  res.forEach((waterReview) => {
    delete waterReview.high_res_aws_key;
  });
  return res;
};

const show = async (writingSampleID) => {
  const res = await db.pool.asyncQuery(
    'SELECT WaterReviews.writing_sample_id, WritingSamples.high_res_aws_key, WaterReviews.user_id, Users.username, WaterReviews.waterproofness, WaterReviews.approved, WaterReviews.created_at, WaterReviews.updated_at FROM WaterReviews LEFT JOIN Users ON Users.user_id=WaterReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=WaterReviews.writing_sample_id WHERE WritingSamples.writing_sample_id=? AND WaterReviews.approved <> 0',
    [writingSampleID],
  );
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
  unapprovedIndex,
  insert,
  show,
  remove,
};
