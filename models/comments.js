const mongoose = require("@app/util/mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
// const User = require("@app/models/users");
// const Video = require("@app/models/videos");

const comment = new Schema({
  videoId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Video",
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  commentTimestamp: {
    type: Date,
    default: Date.now,
  },
  commentText: {
    type: String,
    required: true,
  },
});

const Comment = mongoose.model("Comment", comment);
module.exports = Comment;
