const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const corsOptions = {
//   origin: "*",
// };

// app.use(cors(corsOptions));

app.use(function (req, res, next) {
  next();
});

// app.use(authorizeUser);
app.use("/api", require("./routes/user"));
 

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

 
app.listen(4000,function(e){
  console.log("Server listen")
});
// module.exports = app;
