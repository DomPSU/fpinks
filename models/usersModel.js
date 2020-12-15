const db = require('./db');
const sqlUtil = require('../utils/sql');

const index = async (queryKeys, queryValues) => {
  const partialSQL =
    'SELECT user_id, username, created_at, updated_at, approved FROM Users WHERE';

  const sanitizedSQL = sqlUtil.getSanitizedSQL(
    partialSQL,
    queryKeys,
    queryValues,
  );

  const res = await db.pool.asyncQuery(sanitizedSQL);
  return res;
};

const show = async (id) => {
  const res = await db.pool.asyncQuery(
    'SELECT user_id,  username, created_at, updated_at, approved FROM Users WHERE user_id = ? ',
    [id],
  );
  return res;
};

const insert = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  // search database for user
  const selectRes = await db.pool.asyncQuery(
    'SELECT * FROM Users WHERE sub = ? AND iss = ?',
    [data.sub, data.iss],
  );

  // insert user if he or she doesnt exist
  if (selectRes.length === 0) {
    const insertRes = await db.pool.asyncQuery(
      'INSERT INTO Users (email, username, sub, iss, level, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        data.email.toLowerCase(),
        'anonymous',
        data.sub,
        data.iss,
        'user',
        0,
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      ],
    );
    console.log(insertRes);
    return insertRes;
  }

  // return user if it already exists
  if (selectRes.length === 1) {
    console.log(selectRes);
    return selectRes;
  }

  if (selectRes.length >= 2) {
    throw Object.assign(new Error('duplicate user in database'), { code: 500 });
  }
};

const update = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  const updateRes = await db.pool.asyncQuery(
    'UPDATE Users SET approved = ?, updated_at = ? WHERE user_id = ?',
    [
      data.approved,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      data.userID,
    ],
  );
  console.log(updateRes);
  return updateRes;
};

const getUserFromSubAndIss = async (data) => {
  const selectRes = await db.pool.asyncQuery(
    'SELECT * FROM Users WHERE sub = ? AND iss = ?',
    [data.sub, data.iss],
  );

  // TODO throw error if length !== 1

  return selectRes[0];
};

module.exports = {
  index,
  show,
  insert,
  update,
  getUserFromSubAndIss,
};
