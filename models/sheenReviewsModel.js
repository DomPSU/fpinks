const db = require('./db');
const awsUrls = require('../utils/awsUrls');

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT SheenReviews.writing_sample_id, Users.username, Colors.name AS color, SheenReviews.amount, SheenReviews.created_at, SheenReviews.updated_at FROM SheenReviews LEFT JOIN Users ON Users.user_id=SheenReviews.user_id LEFT JOIN Colors ON Colors.color_id=SheenReviews.color_id WHERE SheenReviews.approved <> 0',
  );
  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT SheenReviews.writing_sample_id, WritingSamples.high_res_aws_key, SheenReviews.user_id, Users.username, SheenReviews.color_id, Colors.name, SheenReviews.amount, SheenReviews.approved, SheenReviews.created_at, SheenReviews.updated_at FROM SheenReviews LEFT JOIN Users ON Users.user_id=SheenReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=SheenReviews.writing_sample_id LEFT JOIN Colors ON Colors.color_id=SheenReviews.color_id WHERE SheenReviews.approved = 0',
  );
  await awsUrls.addHighResUrls(res);
  return res;
};

const show = async (writingSampleID) => {
  const res = await db.pool.asyncQuery(
    'SELECT SheenReviews.writing_sample_id, Users.username, Colors.name AS color, SheenReviews.amount, SheenReviews.created_at, SheenReviews.updated_at FROM SheenReviews LEFT JOIN Users ON Users.user_id=SheenReviews.user_id LEFT JOIN Colors ON Colors.color_id=SheenReviews.color_id WHERE SheenReviews.writing_sample_id=? AND SheenReviews.approved <> 0',
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
    [data.color],
  );

  const colorID = colorNameQuery[0].color_id;

  const insertRes = await db.pool.asyncQuery(
    'INSERT INTO SheenReviews (writing_sample_id, user_id, color_id, amount, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      data.writingSampleID,
      data.userID,
      colorID,
      data.amount.toLowerCase(),
      0,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
    ],
  );

  return insertRes;
};

const remove = async (data) => {
  // remove existing sheen review if it exists
  const deleteRes = await db.pool.asyncQuery(
    'DELETE FROM SheenReviews WHERE writing_sample_id = ? AND user_id = ?',
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
