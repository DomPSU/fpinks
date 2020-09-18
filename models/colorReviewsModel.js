const db = require('./db');
const awsUrls = require('../utils/awsUrls');

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT ColorReviews.writing_sample_id, WritingSamples.high_res_aws_key, ColorReviews.user_id, Users.username, ColorReviews.color_id, Colors.name, ColorReviews.approved, ColorReviews.created_at, ColorReviews.updated_at FROM ColorReviews LEFT JOIN Users ON Users.user_id=ColorReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=ColorReviews.writing_sample_id LEFT JOIN Colors ON Colors.color_id=ColorReviews.color_id WHERE ColorReviews.approved <> 0',
  );

  await awsUrls.addHighResUrls(res);

  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT ColorReviews.writing_sample_id, WritingSamples.high_res_aws_key, ColorReviews.user_id, Users.username, ColorReviews.color_id, Colors.name, ColorReviews.approved, ColorReviews.created_at, ColorReviews.updated_at FROM ColorReviews LEFT JOIN Users ON Users.user_id=ColorReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=ColorReviews.writing_sample_id LEFT JOIN Colors ON Colors.color_id=ColorReviews.color_id WHERE ColorReviews.approved = 0',
  );

  await awsUrls.addHighResUrls(res);

  return res;
};

const show = async (writingSampleID) => {
  const res = await db.pool.asyncQuery(
    'SELECT ColorReviews.writing_sample_id, WritingSamples.high_res_aws_key, ColorReviews.user_id, Users.username, ColorReviews.color_id, Colors.name, ColorReviews.approved, ColorReviews.created_at, ColorReviews.updated_at FROM ColorReviews LEFT JOIN Users ON Users.user_id=ColorReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=ColorReviews.writing_sample_id LEFT JOIN Colors ON Colors.color_id=ColorReviews.color_id WHERE ColorReviews.writing_sample_id=? AND ColorReviews.approved <> 0',
    [writingSampleID],
  );

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

  // insert first color review
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

module.exports = {
  index,
  unapprovedIndex,
  insert,
  show,
  remove,
};
