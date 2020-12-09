const writingSamplesModel = require('../models/writingSamplesModel');
const pensModel = require('../models/pensModel');
const nibsModel = require('../models/nibsModel');
const penNibsModel = require('../models/penNibsModel');
const inksModel = require('../models/inksModel');
const papersModel = require('../models/papersModel');

const index = async (req, res, next) => {
  try {
    const data = await writingSamplesModel.index(
      res.locals.processedQueryKeys,
      res.locals.processedQueryValues,
    );
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

const search = async (req, res, next) => {
  // TODO HACK
  const queryKeys = ['WritingSamples.approved'];
  const queryValues = ['1'];

  const { query } = req.params;

  let data;

  // blank query
  if (query === undefined) {
    try {
      data = await writingSamplesModel.index(queryKeys, queryValues);
      res.status(200).send(data);
      return;
    } catch (e) {
      next(e);
    }
  }

  // whitespace query
  if (query.trim === '') {
    try {
      data = await writingSamplesModel.index(queryKeys, queryValues);
      res.status(200).send(data);
      return;
    } catch (e) {
      next(e);
    }
  }

  // process query

  // TODO
  // validate number of '=' is the same or one greater than number of ','

  // no equals
  if (query.search('=') < 0) {
    try {
      data = await writingSamplesModel.basicSearch(query);
      res.status(200).send(data);
      return;
    } catch (e) {
      next(e);
    }

    // one equals, no commas
  } else if (query.search(',') < 0) {
    console.log('equal and no commas');

    // general case
  } else {
    console.log('equal and commas');
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
  insert,
  show,
  search,
};
