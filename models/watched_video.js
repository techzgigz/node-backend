const mongoose = require("@app/util/mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
// const User = require("@app/models/users");
// const Video = require("@app/models/videos");

const watchedVideo = new Schema({
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
  playedTime: Number,
  playedPercent: Number,
});

const WatchedVideo = mongoose.model("WatchedVideo", watchedVideo);
module.exports = WatchedVideo;
