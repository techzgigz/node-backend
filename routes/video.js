const express = require("express");
const router = express.Router();
const videoController = require("@app/controllers/videos/resolvers");
const videoSchema = require("@app/controllers/videos/validate");
const validate = require("@app/util/joi");
const { authorizeUser } = require("@app/util/authorize");

router.post(
  "/",
  validate(videoSchema.videoAdd),
  authorizeUser,
  videoController.saveVideo
);

router.get("/all", videoController.getAllVideos);
router.post(
  "/videoByStatus",
  validate(videoSchema.videoByStatus),
  authorizeUser,
  videoController.getVideosByStatus
);
router.post(
  "/videoByUserId",
  validate(videoSchema.videosUserName),
  authorizeUser,
  videoController.getVideosUserName
);
router.put(
  "/like",
  validate(videoSchema.likeislike),
  authorizeUser,
  videoController.likeVideo
);
router.put(
  "/dislike",
  validate(videoSchema.likeislike),
  authorizeUser,
  videoController.dislikeVideo
);
router.put(
  "/updateVideoStatus",
  validate(videoSchema.updateVideoStatus),
  videoController.updateVideoStatus
);
router.put(
  "/markedFavourite",
  validate(videoSchema.likeislike),
  authorizeUser,
  videoController.markFavourite
);
router.delete(
  "/deleteVideo",
  validate(videoSchema.deleteVideo),
  videoController.deleteVideo
);
router.put(
  "/unmarkedFavourite",
  validate(videoSchema.likeislike),
  authorizeUser,
  videoController.unmarkFavourite
);
router.post(
  "/getVideoById",
  validate(videoSchema.likeislike),
  authorizeUser,
  videoController.getVideoById
);
router.post(
  "/getFavVideosOfUser",
  validate(videoSchema.favourite),
  authorizeUser,
  videoController.getFavVideosOfUser
);

module.exports = router;
