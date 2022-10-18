const mongoose = require("@app/util/mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
// const User = require("@app/models/users");
const Comment = require("@app/models/comments");

const video = new Schema({
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  youtubeId: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  uploadTimestamp: {
    type: Date,
    default: Date.now,
  },
  adminActionTimestamp: {
    type: Date,
    default: Date.now,
  },
  like: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  favourite: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: [],
    },
  ],
  watched: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Video = mongoose.model("Video", video);
module.exports = Video;
