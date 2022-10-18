const mongoose = require("@app/util/mongoose");
const bcrypt = require("bcryptjs");
const { required } = require("joi");
const { Schema } = mongoose;

const userSchema = new Schema({
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  firebaseUid: {
    type: String,
    unique: true,
    required: true,
  },
  fcmToken: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  surName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  onboardTimestamp: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  videoCategory: [
    {
      type: String,
      default: [],
    },
  ],
  follower: [
    {
      type: Schema.Types.ObjectId,
      default: [],
      ref: "User",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      default: [],
      ref: "User",
    },
  ],
  uploadedVideo: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video",
      default: [],
    },
  ],
});

userSchema.statics.phoneExist = function (phone) {
  return this.findOne({ phone });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
