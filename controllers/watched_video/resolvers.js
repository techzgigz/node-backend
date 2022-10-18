const videoModel = require("@app/models/videos");
const bcrypt = require("bcryptjs");
const { isNull } = require("@app/util/check");
const userModel = require("@app/models/users");
const watchedVideoModel = require("@app/models/watched_video");

const updateWatched = async (req, res, next) => {
  const { videoId, playedTime, playedPercent } = req.body;
  try {
    const watched = await watchedVideoModel.findOneAndUpdate(
      { videoId, userId: req.user._id },
      { videoId, userId: req.user._id, playedTime, playedPercent },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    if (isNull(watched)) {
      throw { status: 400, message: "Not added to watchlist" };
    } else {
      await videoModel.findOneAndUpdate(
        { _id: videoId },
        { $addToSet: { watched: watched._id } }
      );
    }
    res.send({ message: "Updated watch" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getPartiallyWatchedVideosOfUser = async (req, res, next) => {
  const { userId } = req.body;
  try {
    let video = await watchedVideoModel
      .find({ userId, playedPercent: { $lt: 95 } })
      .populate({ path: "videoId" })
      .populate({ path: "videoId", populate: { path: "uploadedBy" } })
      .populate({
        path: "videoId",
        populate: { path: "comment", populate: { path: "userId" } },
      })
      .exec();
    res.send({ data: { videoList: video, count: video.length } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getCompletelyWatchedVideosOfUser = async (req, res, next) => {
  const { userId } = req.body;
  try {
    let video = await watchedVideoModel
      .find({ userId, playedPercent: { $gte: 95 } })
      .populate({ path: "videoId" })
      .populate({ path: "videoId", populate: { path: "uploadedBy" } })
      .populate({
        path: "videoId",
        populate: { path: "comment", populate: { path: "userId" } },
      })
      .exec();
    res.send({ data: { videoList: video, count: video.length } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  updateWatched,
  getPartiallyWatchedVideosOfUser,
  getCompletelyWatchedVideosOfUser,
};
