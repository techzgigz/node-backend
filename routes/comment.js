const express = require("express");
const router = express.Router();
const comentController = require("@app/controllers/comment/resolvers");
const commentSchema = require("@app/controllers/comment/validate");
const validate = require("@app/util/joi");
const { authorizeUser } = require("@app/util/authorize");

router.post(
  "/create",
  validate(commentSchema.commentAdd),
  authorizeUser,
  comentController.createComment
);
router.post(
  "/commentByVideoId",
  validate(commentSchema.commentByVideoId),
  authorizeUser,
  comentController.commentByVideoId
);

module.exports = router;
