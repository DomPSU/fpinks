const db = require('./db');

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM Users WHERE approved <> 0',
  );
  res.forEach((user) => {
    delete user.password;
  });
  return res;
};

const show = async (id) => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM Users WHERE user_id = ? ',
    [id],
  );

  res.forEach((user) => {
    delete user.password;
  });
  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM Users WHERE approved = 0',
  );
  res.forEach((user) => {
    delete user.password;
  });
  return res;
};

const insert = async (data) => {
  // TODO validate all needed keys

  // TODO validate all values not blank unless they can be NULL from schema, set up JSON

  // search database for user
  const selectRes = await db.pool.asyncQuery(
    'SELECT * FROM Pens WHERE brand = ? AND model = ?',
    [data.penBrand, data.penModel],
  );

  // insert user if he or she doesnt exist
  if (selectRes.length === 0) {
    const insertRes = await db.pool.asyncQuery(
      'INSERT INTO Pens (brand, model, approved, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [
        data.penBrand.toLowerCase(),
        data.penModel.toLowerCase(),
        0,
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      ],
    );
    console.log(insertRes);
    return insertRes;
  }

  // return pen if it already exists
  if (selectRes.length === 1) {
    console.log(selectRes);
    return selectRes;
  }

  if (selectRes.length >= 2) {
    throw Object.assign(new Error('duplicate pen in database'), { code: 500 });
  }
};

module.exports = {
  index,
  unapprovedIndex,
  show,
};
