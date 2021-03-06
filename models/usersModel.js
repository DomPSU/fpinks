const db = require('./db');
const sqlUtil = require('../utils/sql');

const partialSQL =
  'SELECT user_id, username, created_at, updated_at, approved FROM Users WHERE';

const index = async (queryKeys, queryValues) => {
  const sanitizedSQL = sqlUtil.getSanitizedSQL(
    partialSQL,
    queryKeys,
    queryValues,
  );

  const res = await db.pool.asyncQuery(sanitizedSQL);
  return res;
};

const show = async (id) => {
  const res = await db.pool.asyncQuery(`${partialSQL} user_id = ?`, [id]);
  return res;
};

const insert = async (data) => {
  let selectRes = await db.pool.asyncQuery(
    'SELECT user_id FROM Users WHERE sub = ? AND iss = ?',
    [data.sub, data.iss],
  );

  if (selectRes.length === 0) {
    await db.pool.asyncQuery(
      'INSERT INTO Users (email, username, sub, iss, level, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        data.email.toLowerCase(),
        'anonymous',
        data.sub,
        data.iss,
        'user',
        1,
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      ],
    );

    selectRes = await db.pool.asyncQuery(
      'SELECT user_id FROM Users WHERE sub = ? AND iss = ?',
      [data.sub, data.iss],
    );
  }

  if (selectRes.length === 1) {
    return selectRes[0];
  }

  if (selectRes.length > 1) {
    throw Object.assign(new Error('duplicate user in database'), { code: 500 });
  }
};

const update = async (data) => {
  const updateRes = await db.pool.asyncQuery(
    'UPDATE Users SET approved = ?, updated_at = ? WHERE user_id = ?',
    [
      data.approved,
      new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      data.userID,
    ],
  );
  return updateRes;
};

const getUserFromSubAndIss = async (data) => {
  const selectRes = await db.pool.asyncQuery(
    'SELECT * FROM Users WHERE sub = ? AND iss = ?',
    [data.sub, data.iss],
  );

  return selectRes[0];
};

module.exports = {
  index,
  show,
  insert,
  update,
  getUserFromSubAndIss,
};
