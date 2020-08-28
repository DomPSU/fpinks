const writingSamplesModel = require('../models/writingSamplesModel');
const pensModel = require('../models/pensModel');
const nibsModel = require('../models/nibsModel');
const penNibsModel = require('../models/penNibsModel');
const inksModel = require('../models/inksModel');
const papersModel = require('../models/papersModel');

const index = async (req, res, next) => {
  let data;
  try {
    data = await writingSamplesModel.index();
    res.status(200).send(data);
  } catch (e) {
    next(e);
  }
};

const show = async (req, res, next) => {
  let data;
  const { id } = req.params;

  try {
    data = await writingSamplesModel.show(id);
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
  const awsKey = req.file.key || req.file.filename; // aws or local storage

  // process ink insert
  const ink = {
    inkBrand: req.body.inkBrand,
    inkName: req.body.inkName,
  };

  let inkID;

  try {
    const data = await inksModel.insert(ink);

    // get inkID from insert or query
    inkID = data.insertId || data[0].ink_id;
  } catch (e) {
    next(e);
  }

  // process paper insert
  const paper = {
    paperBrand: req.body.paperBrand,
    paperName: req.body.paperName,
    paperStyle: req.body.paperStyle,
  };

  let paperID;

  try {
    const data = await papersModel.insert(paper);

    // get paperID from insert or query
    paperID = data.insertId || data[0].paper_id;
  } catch (e) {
    next(e);
  }

  // process pen insert
  const pen = {
    penBrand: req.body.penBrand,
    penModel: req.body.penModel,
  };

  let penID;

  try {
    const data = await pensModel.insert(pen);

    // get penID from insert or query
    penID = data.insertId || data[0].pen_id;
  } catch (e) {
    next(e);
  }

  // process nib insert
  const nib = {
    nibSize: req.body.nibSize,
    nibGrind: req.body.nibGrind,
    nibTune: req.body.nibTune,
  };

  let nibID;

  try {
    const data = await nibsModel.insert(nib);

    // get nibID from insert or query
    nibID = data.insertId || data[0].nib_id;
  } catch (e) {
    next(e);
  }

  // process penNib insert
  const penNibs = {
    penID,
    nibID,
  };

  try {
    await penNibsModel.insert(penNibs);
  } catch (e) {
    next(e);
  }

  // process writingSample insert
  const writingSample = {
    penID,
    nibID,
    inkID,
    paperID,
    awsKey,
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
  show,
};
