const express = require("express");
const router = express.Router();
const watchedVideoController = require("@app/controllers/watched_video/resolvers");
const watchedVideoSchema = require("@app/controllers/watched_video/validate");
const validate = require("@app/util/joi");
const { authorizeUser } = require("@app/util/authorize");

router.post(
  "/create",
  validate(watchedVideoSchema.watchAdd),
  authorizeUser,
  watchedVideoController.updateWatched
);

router.post(
  "/partiallyWatched",
  validate(watchedVideoSchema.partiallyWatched),
  authorizeUser,
  watchedVideoController.getPartiallyWatchedVideosOfUser
);

router.post(
  "/completelyWatched",
  validate(watchedVideoSchema.partiallyWatched),
  authorizeUser,
  watchedVideoController.getCompletelyWatchedVideosOfUser
);

module.exports = router;
