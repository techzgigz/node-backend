const express = require("express");
const app = express();

const createError = require("http-errors");
const { resolve } = require('path');

const db = require("./models");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require('dotenv').config({ path: './.env' });

app.use(function (req, res, next) {
  next();
});
app.use(express.static(process.env.STATIC_DIR));
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    }
  })
);
app.get('/', (req, res) => {
  const path = resolve(process.env.STATIC_DIR + '/index.html');
  res.sendFile(path);
});
app.get('/config', (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});
app.use("/", require("./routes/stripe"));
db.sequelize.sync().
  then(function () {
    
    app.use("/api/vi", require("./routes/property"));
    console.log('DB connection sucessful.');
  }).catch(err => console.log("DB Notconnection ."));

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
const errorLogger = (error, req, res, next) => {
   next(error); // forward to next middleware
};
const failSafeHandler = (err, _, res, __) =>
  res
    .status(err.status || 500)
    .json({ status: err.status, message: err.message });

app.use(errorLogger);
app.use(failSafeHandler);
app.listen(process.env.PORT, function (e) {
  console.log(`Node server listening at ${process.env.PORT}`)
});
// module.exports = app;