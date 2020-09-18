const AWS = require('../config/aws');

// TODO optimize adding urls for admins so less AWS charge???
// ctrl all files that import awsUrls andd see where urls are not needed

const addHighResUrls = async (res) => {
  res.forEach(
    // TODO fix es lint error and use await instead of then?
    (writingSample) =>
      AWS.getURL(writingSample.high_res_aws_key).then(
        // eslint-disable-next-line no-return-assign
        (highResUrl) => (writingSample.high_res_url = highResUrl),
      ),
  );
};

const addLowResUrls = async (res) => {
  res.forEach(
    // TODO fix es lint error and use await instead of then?
    (writingSample) =>
      AWS.getURL(writingSample.low_res_aws_key).then(
        // eslint-disable-next-line no-return-assign
        (lowResUrl) => (writingSample.low_res_url = lowResUrl),
      ),
  );
};

const addOriginalUrls = async (res) => {
  res.forEach(
    // TODO fix es lint error and use await instead of then?
    (writingSample) =>
      AWS.getURL(writingSample.original_aws_key).then(
        // eslint-disable-next-line no-return-assign
        (originalResUrl) => (writingSample.original_url = originalResUrl),
      ),
  );
};

const addUrlsToRes = async (res) => {
  addHighResUrls(res);
  addLowResUrls(res);
  addOriginalUrls(res);
};

module.exports = {
  addHighResUrls,
  addLowResUrls,
  addOriginalUrls,
  addUrlsToRes,
};
