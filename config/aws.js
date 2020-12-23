const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const bucketName = process.env.AWS_BUCKET;
AWS.config.update({ region: process.env.AWS_REGION });

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// Create the parameters for calling listObjects
const bucketParams = {
  Bucket: bucketName,
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
  const url = s3.getSignedUrl('getObject', { Bucket: bucketName, Key: key });
  return url; // TODO add error handling for bad key
}

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerS3Config = multerS3({
  s3,
  bucket: bucketName,
  contentType: multerS3.AUTO_CONTENT_TYPE, // display image in browser, instead of downloading
  metadata(req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key(req, file, cb) {
    cb(null, `original/${new Date().toISOString()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: multerS3Config,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 25,
  },
});

module.exports = {
  getWritingSamples,
  getURL,
  upload,
};
