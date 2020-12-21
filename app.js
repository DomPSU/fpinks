require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const createError = require('http-errors');
const util = require('./utils/util');
const apiRouter = require('./routes');
const { setAuth } = require('./middlewares/authMiddleware');
const { sanitizeReqBody } = require('./middlewares/reqBodyMiddleware');

const app = express();

if (util.isDevelopment()) {
  app.use(cors());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(setAuth);
app.use(sanitizeReqBody);
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api', apiRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// catch 404
app.use((req, res, next) => {
  next(createError(404, 'Not Found'));
});

// error handler
app.use((err, req, res, next) => {
  err.status = err.status ? err.status : 500;
  err.message = err.message ? err.message : 'Server error';
  res.status(err.status);

  console.log(`${err.status} : ${err.message}`);

  res.json({ Error: err.message }).end();
});

module.exports = app;
