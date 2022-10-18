const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const winston = require("winston");

const { authorizeUser } = require("@app/util/authorize");

const app = express();

app.use(logger("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  winston.info("API : " + req.originalUrl);
  winston.info("Header : " + JSON.stringify(req.headers, null, 4));
  winston.info("Request : " + JSON.stringify(req.body, null, 4));
  let oldSend = res.send;
  res.send = function (data) {
    oldSend.apply(res, arguments);
    winston.info("Response : " + JSON.stringify(data, null, 4));
  };
  next();
});

app.use(authorizeUser);

app.use("/api/user", require("@app/routes/user"));
app.use("/api/video", require("@app/routes/video"));
app.use("/api/comment", require("@app/routes/comment"));
app.use("/api/watchedVideo", require("@app/routes/watched_video"));
app.use("/api/admin", require("@app/routes/admin"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const errorLogger = (error, req, res, next) => {
  // for logging errors
  winston.error(error); // or using any fancy logging library
  next(error); // forward to next middleware
};

const failSafeHandler = (err, _, res, __) =>
  res
    .status(err.status || 500)
    .json({ status: err.status, message: err.message });

app.use(errorLogger);
app.use(failSafeHandler);

module.exports = app;
