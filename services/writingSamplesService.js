const writingSamplesModel = require('../models/writingSamplesModel');
const pensModel = require('../models/pensModel');
const nibsModel = require('../models/nibsModel');
const penNibsModel = require('../models/penNibsModel');

const index = async (req, res, next) => {
  let data;
  try {
    data = await writingSamplesModel.index();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const unapprovedIndex = async (req, res, next) => {
  let data;
  try {
    data = await writingSamplesModel.unapprovedIndex();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const insert = async (req, res, next) => {
  console.log('request file'); // TODO remove
  console.log(req.file); // TODO remove

  console.log('request body'); // TODO remove
  console.log(req.body); // TODO remove

  // check if Ink Model already exists, insert if it doesnt, get id if it does

  // check if pen Model already exists, insert if it doesnt, get id if it does

  // chec kif nib Model already exists, insert if it doesnt, get id if it does

  // check if pen nib relation exists, insert if it doesnt, get id if it does

  // chgeck if paper felation exists, insert if it doesnt, get id if it does

  // insert writing sample model

  const writingSample = {
    ...req.body,
  };

  try {
    const data = await writingSamplesModel.insert(writingSample);
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  index,
  unapprovedIndex,
  insert,
};
