const AWS = require('../config/aws');

// TODO Urls -> URLs, res -> data
const addHighResUrls = async (res) => {
  res.forEach((writingSample) => {
    if (writingSample.high_res_aws_key === null) {
      writingSample.high_res_url = null;
    } else {
      AWS.getURL(writingSample.high_res_aws_key).then(
        // eslint-disable-next-line no-return-assign
        (highResUrl) => (writingSample.high_res_url = highResUrl),
      );
    }
  });
};

// TODO Urls -> URLs, res -> data
const addLowResUrls = async (res) => {
  res.forEach((writingSample) => {
    if (writingSample.low_res_aws_key === null) {
      writingSample.low_res_url = null;
    } else {
      AWS.getURL(writingSample.low_res_aws_key).then(
        // eslint-disable-next-line no-return-assign
        (lowResUrl) => (writingSample.low_res_url = lowResUrl),
      );
    }
  });
};

// TODO  Urls -> URLs, res -> data
const addOriginalUrls = async (res) => {
  res.forEach((writingSample) => {
    if (writingSample.orignal_aws_key === null) {
      writingSample.original_url = null;
    } else {
      AWS.getURL(writingSample.original_aws_key).then(
        // eslint-disable-next-line no-return-assign
        (originalUrl) => (writingSample.original_url = originalUrl),
      );
    }
  });
};

// TODO rename to addAPIURLs, also rename file to awsURLs.js
const addAPIUrlsToRes = async (res) => {
  addHighResUrls(res);
  addLowResUrls(res);
};

// TODO rename to addAllURLs, also rename file to awsURLs.js
const addUrlsToRes = async (res) => {
  addHighResUrls(res);
  addLowResUrls(res);
  addOriginalUrls(res);
};

const deleteAllAWSKeys = (res) => {
  res.forEach((writingSample) => {
    delete writingSample.high_res_aws_key;
    delete writingSample.low_res_aws_key;
    delete writingSample.original_aws_key;
  });
};

module.exports = {
  addHighResUrls,
  addLowResUrls,
  addOriginalUrls,
  addAPIUrlsToRes,
  addUrlsToRes,
  deleteAllAWSKeys,
};
