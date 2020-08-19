const db = require('./db');

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM WritingSamples WHERE approved <> 0',
  );
  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT * FROM WritingSamples WHERE approved = 0',
  );
  return res;
};

const insert = async (writingSample) => {
  // check if Ink Model already exists, insert if it doesnt, get id if it does

  // check if pen Model already exists, insert if it doesnt, get id if it does

  // chec kif nib Model already exists, insert if it doesnt, get id if it does

  // check if pen nib relation exists, insert if it doesnt, get id if it does

  // chgeck if paper felation exists, insert if it doesnt, get id if it does

  // insert writing sample model

  console.log(writingSample);
  const res = await db.pool.asyncQuery();
  return res;
};

module.exports = {
  index,
  unapprovedIndex,
  insert,
};
