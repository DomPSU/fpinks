const AWS = require('aws-sdk');
const writingSampleModel = require('../models/writingSamplesModel'); // TODO

AWS.config.update({ region: 'us-east-2' });

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// Create the parameters for calling listObjects
const bucketParams = {
  Bucket: 'fpinks.com',
};

const getWritingSamples = async () => {
  // Call S3 to obtain a list of the objects in the bucket
  s3.listObjects(bucketParams, function (err, data) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data);
      return data;
    }
  });
};

async function getURL(key) {
  const url = s3.getSignedUrl('getObject', { Bucket: 'fpinks.com', Key: key });
  return url; // TODO add error handling for bad key
}

module.exports = {
  getWritingSamples,
  getURL,
};
