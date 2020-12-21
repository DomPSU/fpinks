const createError = require('http-errors');

const setShadingReview = (req, res, next) => {
  const writingSampleID = req.params.writingSampleID
    ? req.params.writingSampleID
    : req.body.writingSampleID;

  res.locals.shadingReview = {
    writingSampleID,
    userID: res.locals.user.user_id,
    amount: req.body.amount,
    approved: req.body.approved,
  };

  if (res.locals.user.level === 'admin' && req.body.userID !== undefined) {
    res.locals.shadingReview.userID = req.body.userID;
  }

  next();
};

module.exports = {
  setShadingReview,
};
