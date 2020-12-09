const db = require('./db');
const awsUrls = require('../utils/awsUrls');
const sqlUtil = require('../utils/sql');

const deleteAPIAWSkeys = (res) => {
  res.forEach((writingSample) => {
    // eslint-disable-next-line no-param-reassign
    delete writingSample.high_res_aws_key;
    // eslint-disable-next-line no-param-reassign
    delete writingSample.low_res_aws_key;
  });
};

const index = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT Users.username, WritingSamples.writing_sample_id, Pens.brand AS pen_brand, Pens.model AS pen_model, Nibs.size AS nib_size, Nibs.grind AS nib_grind, Nibs.tune AS nib_tune, Inks.brand AS ink_brand, Inks.name AS ink_name, Papers.brand AS paper_brand, Papers.name as paper_name, Papers.style as paper_style, WritingSamples.created_at, WritingSamples.updated_at, WritingSamples.low_res_aws_key, WritingSamples.high_res_aws_key FROM WritingSamples LEFT JOIN Pens ON WritingSamples.pen_id = Pens.pen_id LEFT JOIN Nibs ON WritingSamples.nib_id = Nibs.nib_id LEFT JOIN Inks ON WritingSamples.ink_id = Inks.ink_id LEFT JOIN Papers ON WritingSamples.paper_id = Papers.paper_id LEFT JOIN Users ON WritingSamples.user_id = Users.user_id WHERE';

  let sanitizedSQL = sqlUtil.getSanitizedSQL(
    partialSQL,
    queryKeys,
    queryValues,
  );

  sanitizedSQL = sanitizedSQL.concat(
    ' ORDER BY WritingSamples.writing_sample_id DESC',
  );

  const res = await db.pool.asyncQuery(sanitizedSQL);
  await awsUrls.addAPIUrlsToRes(res);
  deleteAPIAWSkeys(res);
  return res;
};

const show = async (id) => {
  const res = await db.pool.asyncQuery(
    'SELECT Users.username, WritingSamples.writing_sample_id, Pens.brand AS pen_brand, Pens.model AS pen_model, Nibs.size AS nib_size, Nibs.grind AS nib_grind, Nibs.tune AS nib_tune, Inks.brand AS ink_brand, Inks.name AS ink_name, Papers.brand AS paper_brand, Papers.name as paper_name, Papers.style as paper_style, WritingSamples.created_at, WritingSamples.updated_at, WritingSamples.low_res_aws_key, WritingSamples.high_res_aws_key FROM WritingSamples LEFT JOIN Pens ON WritingSamples.pen_id = Pens.pen_id LEFT JOIN Nibs ON WritingSamples.nib_id = Nibs.nib_id LEFT JOIN Inks ON WritingSamples.ink_id = Inks.ink_id LEFT JOIN Papers ON WritingSamples.paper_id = Papers.paper_id LEFT JOIN Users ON WritingSamples.user_id = Users.user_id WHERE WritingSamples.writing_sample_id = ? ',
    [id],
  );
  await awsUrls.addAPIUrlsToRes(res);
  deleteAPIAWSkeys(res);
  return res;
};
const basicSearch = async (query) => {
  const res = await db.pool.asyncQuery(
    'SELECT WritingSamples.writing_sample_id, WritingSamples.low_res_aws_key FROM WritingSamples LEFT JOIN Pens ON WritingSamples.pen_id = Pens.pen_id LEFT JOIN Nibs ON WritingSamples.nib_id = Nibs.nib_id LEFT JOIN Inks ON WritingSamples.ink_id = Inks.ink_id LEFT JOIN Papers ON WritingSamples.paper_id = Papers.paper_id LEFT JOIN ColorReviews ON ColorReviews.writing_sample_id=WritingSamples.writing_sample_id LEFT JOIN Colors ON ColorReviews.color_id=Colors.color_id WHERE WritingSamples.approved <> 0 AND (Inks.brand LIKE ? OR Inks.name LIKE ? OR Papers.brand LIKE ? OR Papers.name LIKE ? OR Papers.style LIKE ? OR Papers.lbs LIKE ? Or Papers.grams LIKE ? OR Pens.brand LIKE ? Or Pens.model LIKE ? OR Nibs.size LIKE ? OR Nibs.grind LIKE ? OR Nibs.tune LIKE ? OR Colors.name LIKE ?) GROUP BY WritingSamples.writing_sample_id ORDER BY WritingSamples.writing_sample_id DESC',
    [
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
      `%${query}%`,
    ],
  );
  await awsUrls.addLowResUrls(res);
  return res;
};

const insert = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  // TODO FIX INSERT. user_id defaults to 1 but should be either null, anonymous or logged in user
  const insertRes = await db.pool.asyncQuery(
    'INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, user_id, original_aws_key, valid_waterproofness, valid_transparency, valid_drying_time, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      data.penID,
      data.nibID,
      data.inkID,
      data.paperID,
      1,
      data.awsKey,
      0,
      0,
      0,
      0,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
    ],
  );
  return insertRes;
};

module.exports = {
  index,
  insert,
  show,
  basicSearch,
};
