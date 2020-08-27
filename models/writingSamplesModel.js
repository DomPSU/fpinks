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
  // console.log('AWS WRITING SAMPLES');
  // AWS.getWritingSamples();

  console.log('getURL');
  AWS.getURL('013a33f57h1f4c32iinnkkhc6qd3').then((meow) => console.log(meow));

  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  // TODO search database for pre existing writing sample
  // const selectRes = await db.pool.asyncQuery(
  // );

  // insert writingSample if it doesnt exist
  // if (selectRes.length === 0) { TODO
  if (true) {
    const insertRes = await db.pool.asyncQuery(
      'INSERT INTO WritingSamples (pen_id, nib_id, ink_id, paper_id, url, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        data.penID,
        data.nibID,
        data.inkID,
        data.paperID,
        'fake url', // TODO
        0,
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      ],
    );
    console.log(insertRes);
    return insertRes;
  }

  // return writingSample if it already exists
  /*
  if (selectRes.length === 1) {
    console.log(selectRes);
    return selectRes;
  }

  if (selectRes.length >= 2) {
    throw Object.assign(new Error('duplicate ink in database'), { code: 500 });
  }
  */
};

module.exports = {
  index,
  unapprovedIndex,
  insert,
  show,
};
