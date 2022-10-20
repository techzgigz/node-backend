const express = require("express");
const app = express();

const createError = require("http-errors");
const db = require("./models");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const corsOptions = {
//   origin: "*",
// };

// app.use(cors(corsOptions));

app.use(function (req, res, next) {
  next();
});
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
app.use("/api/vi", require("./routes/property"));
 
//catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(4000,function(e){
  console.log("Server listen")
});
// module.exports = app;