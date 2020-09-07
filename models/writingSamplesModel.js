const db = require('./db');
const AWS = require('../config/aws');

// TODO optimize this for admins so less AWS charge
const addUrlsToRes = async (res) => {
  res.forEach(
    // TODO fix es lint error and use await instead of then?
    (writingSample) =>
      AWS.getURL(writingSample.low_res_aws_key).then(
        // eslint-disable-next-line no-return-assign
        (lowResUrl) => (writingSample.low_res_url = lowResUrl),
      ),
  );

  res.forEach(
    // TODO fix es lint error and use await instead of then?
    (writingSample) =>
      AWS.getURL(writingSample.high_res_aws_key).then(
        // eslint-disable-next-line no-return-assign
        (highResUrl) => (writingSample.high_res_url = highResUrl),
      ),
  );

  res.forEach(
    // TODO fix es lint error and use await instead of then?
    (writingSample) =>
      AWS.getURL(writingSample.original_aws_key).then(
        // eslint-disable-next-line no-return-assign
        (originalResUrl) => (writingSample.original_url = originalResUrl),
      ),
  );
};

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT Users.username, WritingSamples.writing_sample_id, WritingSamples.pen_id, Pens.brand AS pen_brand, Pens.model AS pen_model, WritingSamples.nib_id, Nibs.size AS nib_size, Nibs.grind AS nib_grind, Nibs.tune AS nib_tune, WritingSamples.ink_id, Inks.brand AS ink_brand, Inks.name AS ink_name, WritingSamples.paper_id, Papers.brand AS paper_brand, Papers.name as paper_name, Papers.style as paper_style, WritingSamples.approved, WritingSamples.created_at, WritingSamples.updated_at, WritingSamples.low_res_aws_key, WritingSamples.high_res_aws_key, WritingSamples.original_aws_key FROM WritingSamples LEFT JOIN Pens ON WritingSamples.pen_id = Pens.pen_id LEFT JOIN Nibs ON WritingSamples.nib_id = Nibs.nib_id LEFT JOIN Inks ON WritingSamples.ink_id = Inks.ink_id LEFT JOIN Papers ON WritingSamples.paper_id = Papers.paper_id LEFT JOIN Users ON WritingSamples.user_id = Users.user_id WHERE WritingSamples.approved <> 0 ORDER BY WritingSamples.writing_sample_id DESC',
  );
  await addUrlsToRes(res);
  return res;
};

const show = async (id) => {
  const res = await db.pool.asyncQuery(
    'SELECT Users.username, WritingSamples.writing_sample_id, WritingSamples.pen_id, Pens.brand AS pen_brand, Pens.model AS pen_model, WritingSamples.nib_id, Nibs.size AS nib_size, Nibs.grind AS nib_grind, Nibs.tune AS nib_tune, WritingSamples.ink_id, Inks.brand AS ink_brand, Inks.name AS ink_name, WritingSamples.paper_id, Papers.brand AS paper_brand, Papers.name as paper_name, Papers.style as paper_style, WritingSamples.approved, WritingSamples.created_at, WritingSamples.updated_at, WritingSamples.low_res_aws_key, WritingSamples.high_res_aws_key, WritingSamples.original_aws_key FROM WritingSamples LEFT JOIN Pens ON WritingSamples.pen_id = Pens.pen_id LEFT JOIN Nibs ON WritingSamples.nib_id = Nibs.nib_id LEFT JOIN Inks ON WritingSamples.ink_id = Inks.ink_id LEFT JOIN Papers ON WritingSamples.paper_id = Papers.paper_id LEFT JOIN Users ON WritingSamples.user_id = Users.user_id WHERE WritingSamples.writing_sample_id = ? ',
    [id],
  );
  await addUrlsToRes(res);
  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT Users.username, WritingSamples.writing_sample_id, WritingSamples.pen_id, Pens.brand AS pen_brand, Pens.model AS pen_model, WritingSamples.nib_id, Nibs.size AS nib_size, Nibs.grind AS nib_grind, Nibs.tune AS nib_tune, WritingSamples.ink_id, Inks.brand AS ink_brand, Inks.name AS ink_name, WritingSamples.paper_id, Papers.brand AS paper_brand, Papers.name as paper_name, Papers.style as paper_style, WritingSamples.approved, WritingSamples.created_at, WritingSamples.updated_at, WritingSamples.low_res_aws_key, WritingSamples.high_res_aws_key, WritingSamples.original_aws_key FROM WritingSamples LEFT JOIN Pens ON WritingSamples.pen_id = Pens.pen_id LEFT JOIN Nibs ON WritingSamples.nib_id = Nibs.nib_id LEFT JOIN Inks ON WritingSamples.ink_id = Inks.ink_id LEFT JOIN Papers ON WritingSamples.paper_id = Papers.paper_idLEFT JOIN Users ON WritingSamples.user_id = Users.user_id WHERE WritingSamples.approved = 0  ORDER BY WritingSamples.writing_sample_id ASC',
  );
  await addUrlsToRes(res);
  return res;
};

const basicSearch = async (query) => {
  const res = await db.pool.asyncQuery(
    'SELECT Users.username, WritingSamples.writing_sample_id, WritingSamples.pen_id, Pens.brand AS pen_brand, Pens.model AS pen_model, WritingSamples.nib_id, Nibs.size AS nib_size, Nibs.grind AS nib_grind, Nibs.tune AS nib_tune, WritingSamples.ink_id, Inks.brand AS ink_brand, Inks.name AS ink_name, WritingSamples.paper_id, Papers.brand AS paper_brand, Papers.name as paper_name, Papers.style as paper_style, Colors.name as color, WritingSamples.approved, WritingSamples.created_at, WritingSamples.updated_at, WritingSamples.low_res_aws_key, WritingSamples.high_res_aws_key, WritingSamples.original_aws_key FROM WritingSamples LEFT JOIN Pens ON WritingSamples.pen_id = Pens.pen_id LEFT JOIN Nibs ON WritingSamples.nib_id = Nibs.nib_id LEFT JOIN Inks ON WritingSamples.ink_id = Inks.ink_id LEFT JOIN Papers ON WritingSamples.paper_id = Papers.paper_id LEFT JOIN Users ON WritingSamples.user_id = Users.user_id LEFT JOIN ColorReviews ON ColorReviews.writing_sample_id=WritingSamples.writing_sample_id LEFT JOIN Colors ON ColorReviews.color_id=Colors.color_id WHERE WritingSamples.approved <> 0 AND (Inks.brand LIKE ? OR Inks.name LIKE ? OR Papers.brand LIKE ? OR Papers.name LIKE ? OR Papers.style LIKE ? OR Papers.lbs LIKE ? Or Papers.grams LIKE ? OR Pens.brand LIKE ? Or Pens.model LIKE ? OR Nibs.size LIKE ? OR Nibs.grind LIKE ? OR Nibs.tune LIKE ? OR Colors.name LIKE ?) ORDER BY WritingSamples.writing_sample_id DESC',
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
  await addUrlsToRes(res);
  return res;
};

const insert = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  const insertRes = await db.pool.asyncQuery(
    'INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, original_aws_key, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      data.penID,
      data.nibID,
      data.inkID,
      data.paperID,
      data.awsKey,
      0,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
    ],
  );
  return insertRes;
};

module.exports = {
  index,
  unapprovedIndex,
  insert,
  show,
  basicSearch,
};
