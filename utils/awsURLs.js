const AWS = require('../config/aws');

const addHighResURLs = async (data) => {
  data.forEach((item) => {
    if (item.high_res_aws_key === null) {
      item.high_res_url = null;
    } else {
      AWS.getURL(item.high_res_aws_key).then(
        // eslint-disable-next-line no-return-assign
        (highResUrl) => (item.high_res_url = highResUrl),
      );
    }
  });
};

const addLowResURLs = async (data) => {
  data.forEach((item) => {
    if (item.low_res_aws_key === null) {
      item.low_res_url = null;
    } else {
      AWS.getURL(item.low_res_aws_key).then(
        // eslint-disable-next-line no-return-assign
        (lowResUrl) => (item.low_res_url = lowResUrl),
      );
    }
  });
};

const addOriginalURLs = async (data) => {
  data.forEach((item) => {
    if (item.orignal_aws_key === null) {
      item.original_url = null;
    } else {
      AWS.getURL(item.original_aws_key).then(
        // eslint-disable-next-line no-return-assign
        (originalUrl) => (item.original_url = originalUrl),
      );
    }
  });
};

const addAPIURLs = async (data) => {
  addHighResURLs(data);
  addLowResURLs(data);
};

const addAllURLs = async (data) => {
  addHighResURLs(data);
  addLowResURLs(data);
  addOriginalURLs(data);
};

const deleteAllAWSKeys = (data) => {
  data.forEach((item) => {
    delete item.high_res_aws_key;
    delete item.low_res_aws_key;
    delete item.original_aws_key;
  });
};

module.exports = {
  addLowResURLs,
  addAPIURLs,
  addAllURLs,
  deleteAllAWSKeys,
};
