const db = require('./db');
const AWS = require('../config/aws');

const addUrlsToRes = async (res) => {
  res.forEach(
    // TODO fix es lint error and use await instead of then?
    (sheenReviews) =>
      AWS.getURL(sheenReviews.high_res_aws_key).then(
        // eslint-disable-next-line no-return-assign
        (highResUrl) => (sheenReviews.high_res_url = highResUrl),
      ),
  );
};

const index = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT SheenReviews.writing_sample_id, WritingSamples.high_res_aws_key, SheenReviews.user_id, Users.username, SheenReviews.color_id, Colors.name, SheenReviews.amount, SheenReviews.approved, SheenReviews.created_at, SheenReviews.updated_at FROM SheenReviews LEFT JOIN Users ON Users.user_id=SheenReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=SheenReviews.writing_sample_id LEFT JOIN Colors ON Colors.color_id=SheenReviews.color_id WHERE SheenReviews.approved <> 0',
  );
  await addUrlsToRes(res);
  res.forEach((sheenReview) => {
    delete sheenReview.high_res_aws_key;
  });
  return res;
};

const unapprovedIndex = async () => {
  const res = await db.pool.asyncQuery(
    'SELECT SheenReviews.writing_sample_id, WritingSamples.high_res_aws_key, SheenReviews.user_id, Users.username, SheenReviews.color_id, Colors.name, SheenReviews.amount, SheenReviews.approved, SheenReviews.created_at, SheenReviews.updated_at FROM SheenReviews LEFT JOIN Users ON Users.user_id=SheenReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=SheenReviews.writing_sample_id LEFT JOIN Colors ON Colors.color_id=SheenReviews.color_id WHERE SheenReviews.approved = 0',
  );
  await addUrlsToRes(res);
  res.forEach((sheenReview) => {
    delete sheenReview.high_res_aws_key;
  });
  return res;
};

const show = async (writingSampleID) => {
  const res = await db.pool.asyncQuery(
    'SELECT SheenReviews.writing_sample_id, WritingSamples.high_res_aws_key, SheenReviews.user_id, Users.username, SheenReviews.color_id, Colors.name, SheenReviews.amount, SheenReviews.approved, SheenReviews.created_at, SheenReviews.updated_at FROM SheenReviews LEFT JOIN Users ON Users.user_id=SheenReviews.user_id LEFT JOIN WritingSamples ON WritingSamples.writing_sample_id=SheenReviews.writing_sample_id LEFT JOIN Colors ON Colors.color_id=SheenReviews.color_id WHERE SheenReviews.writing_sample_id=? AND SheenReviews.approved <> 0',
    [writingSampleID],
  );
  return res;
};
const insert = async (data) => {
  // TODO validate all needed keys
  // TODO validate all values not blank unless they can be NULL from schema, set up JSON
  // search database for color review
  /*
  const selectRes = await db.pool.asyncQuery(
    'SELECT * FROM ColorReview WHERE user_id = ? AND writing_sample_id = ? AND color_id = ?',
    [data.userID, data.writingSampleID, data.colorID],
  );

  // insert color review if it doesnt exist
  if (selectRes.length === 0) {
    const insertRes = await db.pool.asyncQuery(
      'INSERT INTO ColorReviews (user_id, writing_sample_id, color_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
      [
        data.userID,
        data.writingSampleID,
        data.colorID,
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
        new Date().toISOString().replace('T', ' ').replace('Z', ' '),
      ],
    );
    console.log(insertRes);
    return insertRes;
  }

  // return color review if it already exists
  if (selectRes.length === 1) {
    console.log(selectRes);
    return selectRes;
  }

  if (selectRes.length >= 2) {
    throw Object.assign(new Error('duplicate color review in database'), {
      code: 500,
    });
  }
  */
};

module.exports = {
  index,
  unapprovedIndex,
  insert,
  show,
};
