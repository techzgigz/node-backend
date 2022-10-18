const videoModel = require("@app/models/videos");
const bcrypt = require("bcryptjs");
const { isNull } = require("@app/util/check");
const userModel = require("@app/models/users");

const saveVideo = async (req, res, next) => {
  const { link, title, desc, category, youtubeId, thumbnail, status } =
    req.body;

  try {
    const video = videoModel({
      link,
      title,
      desc,
      category,
      youtubeId,
      thumbnail,
      status,
      uploadedBy: req.user._id,
    });
    await video.save();
    console.log(video._id);
    console.log(req.user._id);
    await userModel.findOneAndUpdate(
      { _id: req.user._id },
      {
        $addToSet: {
          uploadedVideo: video._id,
        },
      }
    );
    res.send({
      message: "Video is posted. It will get publish after Admin's approval",
      data: video,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAllVideos = async (req, res, next) => {
  try {
    const videoList = await videoModel
      .find()
      .sort({ uploadTimestamp: -1 })
      .populate({ path: "uploadedBy" })
      .populate({ path: "comment", populate: { path: "userId" } })
      .exec();
    res.send({ data: { videoList, count: videoList.length } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getVideosByStatus = async (req, res, next) => {
  const { status } = req.body;
  try {
    const videoList = await videoModel
      .find({ status })
      .sort({ uploadTimestamp: -1 })
      .populate({ path: "uploadedBy" })
      .populate({ path: "comment", populate: { path: "userId" } })
      .exec();
    res.send({ data: { videoList, count: videoList.length } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getVideosUserName = async (req, res, next) => {
  const { uploadedBy } = req.body;

  try {
    const videoList = await videoModel
      .find({ uploadedBy })
      .sort({ uploadTimestamp: -1 })
      .populate({ path: "uploadedBy" })
      .populate({ path: "comment", populate: { path: "userId" } })
      .exec();
    res.send({ data: { videoList, count: videoList.length } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const likeVideo = async (req, res, next) => {
  const { _id } = req.body;

  try {
    const video = await videoModel.findOneAndUpdate(
      { _id },
      { $addToSet: { like: req.user._id } }
    );
    if (isNull(video)) throw { status: 400, message: "Video not found" };

    res.send({ message: "Liked" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const dislikeVideo = async (req, res, next) => {
  const { _id } = req.body;

  try {
    const video = await videoModel.findOneAndUpdate(
      { _id },
      { $pull: { like: req.user._id } }
    );
    if (isNull(video)) throw { status: 400, message: "Video not found" };

    res.send({ message: "Disliked" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateVideoStatus = async (req, res, next) => {
  const { _id, status } = req.body;

  try {
    const video = await videoModel.findOneAndUpdate(
      { _id },
      { $set: { status } },
      { upsert: true }
    );
    if (isNull(video)) throw { status: 400, message: "Video not found" };

    res.send({ message: "Status updated" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const markFavourite = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const video = await videoModel.findOneAndUpdate(
      { _id },
      { $addToSet: { favourite: req.user._id } }
    );
    if (isNull(video)) throw { status: 400, message: "Video not found" };

    res.send({ message: "Added to favourite list" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const unmarkFavourite = async (req, res, next) => {
  const { _id } = req.body;

  try {
    const video = await videoModel.findOneAndUpdate(
      { _id },
      { $pull: { favourite: req.user._id } }
    );
    if (isNull(video)) throw { status: 400, message: "Video not found" };

    res.send({ message: "Removed from favourite list" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getVideoById = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const video = await videoModel
      .findOne({ _id })
      .populate({ path: "uploadedBy" })
      .populate({
        path: "comment",
        populate: { path: "userId" },
        options: { sort: { commentTimestamp: -1 } },
      })
      .exec();
    res.send({ data: { video } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getFavVideosOfUser = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const video = await videoModel
      .find({ favourite: { $in: [userId] } })
      .sort({ uploadTimestamp: -1 })
      .populate({ path: "uploadedBy" })
      .populate({ path: "comment", populate: { path: "userId" } })
      .exec();
    res.send({ data: { videoList: video, count: video.length } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteVideo = async (req, res, next) => {
  const { _id, userId } = req.body;

  try {
    await userModel.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          uploadedVideo: _id,
        },
      }
    );
    const video = await videoModel
      .findOne({
        _id,
      })
      .remove();
    if (isNull(video)) throw { status: 400, message: "video not found" };
    res.send({
      message: "Deleted",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  saveVideo,
  getAllVideos,
  getVideosByStatus,
  getVideosUserName,
  likeVideo,
  dislikeVideo,
  updateVideoStatus,
  markFavourite,
  unmarkFavourite,
  getVideoById,
  getFavVideosOfUser,
  deleteVideo,
};
