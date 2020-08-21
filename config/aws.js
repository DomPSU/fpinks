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

function encode(data) {
  const buf = Buffer.from(data);
  const base64 = buf.toString('base64');
  return base64;
}

async function getImage(key) {
  const data = s3
    .getObject({
      Bucket: 'fpinks.com',
      Key: key,
    })
    .promise()
    .then((img) => {
      return encode(img.Body);
    })
    .catch((e) => {
      return e;
    });
  return data;
}

module.exports = {
  getWritingSamples,
  getImage,
};
