const mongoose = require("@app/util/mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const metedata = new Schema({
  toc: {
    type: String,
  },
  tou: {
    type: String,
  },
  privacyPolicy: {
    type: String,
  },
});

const Metedata = mongoose.model("Metedata", metedata);
module.exports = Metedata;
