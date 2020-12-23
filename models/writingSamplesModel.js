const db = require('./db');
const {
  addLowResURLs,
  addAPIURLs,
  deleteAllAWSKeys,
} = require('../utils/awsURLs'); // TODO eventually remove this and put into controller
const { getSanitizedSQL } = require('../utils/sql');

const partialSQL =
  'SELECT Users.username, Users.user_id, WritingSamples.writing_sample_id, Pens.pen_id, Pens.brand AS pen_brand, Pens.model AS pen_model, Nibs.nib_id, Nibs.size AS nib_size, Nibs.grind AS nib_grind, Nibs.tune AS nib_tune, Inks.ink_id, Inks.brand AS ink_brand, Inks.name AS ink_name, Papers.paper_id, Papers.brand AS paper_brand, Papers.name as paper_name, Papers.style as paper_style, WritingSamples.comment, WritingSamples.valid_waterproofness, WritingSamples.valid_drying_time, WritingSamples.valid_transparency, WritingSamples.approved, WritingSamples.created_at, WritingSamples.updated_at, WritingSamples.low_res_aws_key, WritingSamples.high_res_aws_key, WritingSamples.original_aws_key FROM WritingSamples LEFT JOIN Pens ON WritingSamples.pen_id = Pens.pen_id LEFT JOIN Nibs ON WritingSamples.nib_id = Nibs.nib_id LEFT JOIN Inks ON WritingSamples.ink_id = Inks.ink_id LEFT JOIN Papers ON WritingSamples.paper_id = Papers.paper_id LEFT JOIN Users ON WritingSamples.user_id = Users.user_id WHERE';

const index = async (queryKeys, queryValues, offset) => {
  const sanitizedSQL = getSanitizedSQL(partialSQL, queryKeys, queryValues);

  const unsanitizedSQL = sanitizedSQL.concat(
    ` ORDER BY WritingSamples.writing_sample_id DESC LIMIT ?, 12;`,
  );

  const res = await db.pool.asyncQuery(unsanitizedSQL, [parseInt(offset, 10)]);

  return res;
};

const show = async (id) => {
  const res = await db.pool.asyncQuery(
    `${partialSQL} WritingSamples.writing_sample_id=${id}`,
    [id],
  );
  await addAPIURLs(res);
  deleteAllAWSKeys(res);
  return res;
};

const basicSearch = async (query, offset) => {
  const res = await db.pool.asyncQuery(
    'SELECT WritingSamples.writing_sample_id, WritingSamples.low_res_aws_key FROM WritingSamples LEFT JOIN Pens ON WritingSamples.pen_id = Pens.pen_id LEFT JOIN Nibs ON WritingSamples.nib_id = Nibs.nib_id LEFT JOIN Inks ON WritingSamples.ink_id = Inks.ink_id LEFT JOIN Papers ON WritingSamples.paper_id = Papers.paper_id LEFT JOIN ColorReviews ON ColorReviews.writing_sample_id=WritingSamples.writing_sample_id LEFT JOIN Colors ON ColorReviews.color_id=Colors.color_id WHERE WritingSamples.approved <> 0 AND (Inks.brand LIKE ? OR Inks.name LIKE ? OR Papers.brand LIKE ? OR Papers.name LIKE ? OR Papers.style LIKE ? OR Papers.lbs LIKE ? Or Papers.grams LIKE ? OR Pens.brand LIKE ? Or Pens.model LIKE ? OR Nibs.size LIKE ? OR Nibs.grind LIKE ? OR Nibs.tune LIKE ? OR Colors.name LIKE ?) GROUP BY WritingSamples.writing_sample_id ORDER BY WritingSamples.writing_sample_id DESC LIMIT ?, 12;',
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
      parseInt(offset, 10),
    ],
  );
  await addLowResURLs(res);
  return res;
};

const insert = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  // TODO FIX INSERT. user_id defaults to 1 but should be either null, anonymous or logged in user
  const insertRes = await db.pool.asyncQuery(
    'INSERT INTO WritingSamples (user_id, comment, pen_id, nib_id, ink_id, paper_id, original_aws_key, valid_waterproofness, valid_transparency, valid_drying_time, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      data.userID,
      data.comment,
      data.penID,
      data.nibID,
      data.inkID,
      data.paperID,
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

const update = async (data) => {
  const updateRes = await db.pool.asyncQuery(
    'UPDATE WritingSamples SET pen_id=?, nib_id=?, ink_id=?, paper_id=?, approved=?, valid_waterproofness=?, valid_drying_time=?, valid_transparency=?,  updated_at=? WHERE writing_sample_id=?',
    [
      data.penID,
      data.nibID,
      data.inkID,
      data.paperID,
      data.approved,
      data.validWaterproofness,
      data.validDryingTime,
      data.validTransparency,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      data.writingSampleID,
    ],
  );
  return updateRes;
};

module.exports = {
  index,
  insert,
  show,
  basicSearch,
  update,
};
