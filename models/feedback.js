const mongoose = require("@app/util/mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const feedback = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    feedbackText: {
      type: String,
    },
    replyText: {
      type: String,
    },
    readByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", feedback);
module.exports = Feedback;
