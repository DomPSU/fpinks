const db = require('./db');
const AWS = require('../config/aws');

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM WritingSamples WHERE approved <> 0',
  );
  return res;
};

const show = async (id) => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM WritingSamples WHERE writing_sample_id = ? ',
    [id],
  );
  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM WritingSamples WHERE approved = 0',
  );
  return res;
};

const insert = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  const insertRes = await db.pool.asyncQuery(
    'INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, aws_key, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
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
};

// console.log('getURL');
// AWS.getURL('ruby_wallpaper.jpg').then((meow) => console.log(meow));
// TODO
