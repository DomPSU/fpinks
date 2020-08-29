const db = require('./db');
const AWS = require('../config/aws');

const addUrlToRes = async (res) => {
  res.forEach(
    // TODO fix es lint error and use await instead of then?
    (writingSample) =>
      AWS.getURL(writingSample.aws_key).then(
        // eslint-disable-next-line no-return-assign
        (url) => (writingSample.url = url),
      ),
  );
};

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM WritingSamples WHERE approved <> 0',
  );
  await addUrlToRes(res);
  return res;
};

const show = async (id) => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM WritingSamples WHERE writing_sample_id = ? ',
    [id],
  );
  await addUrlToRes(res);
  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM WritingSamples WHERE approved = 0',
  );
  await addUrlToRes(res);
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
