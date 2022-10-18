const commentModel = require("@app/models/comments");
const bcrypt = require("bcryptjs");
const { isNull } = require("@app/util/check");
const videoModel = require("@app/models/videos");

const createComment = async (req, res, next) => {
  const { videoId, commentText } = req.body;
  try {
    const comment = commentModel({
      commentText,
      videoId,
      userId: req.user._id,
    });
    await comment.save();
    await videoModel.findOneAndUpdate(
      { _id: videoId },
      { $push: { comment: comment } }
    );
    res.send({
      message: "Comment posted",
      data: comment,
    });
  } catch (err) {
    console.log(err);
    console.log(err);
    next(err);
  }
};

const commentByVideoId = async (req, res, next) => {
  const { videoId } = req.body;
  try {
    const commentList = await commentModel
      .find({ videoId })
      .populate({ path: "userId" })
      .exec();
    res.send({ data: { commentList, count: commentList.length } });
  } catch (err) {
    console.log(err);
    console.log(err);
    next(err);
  }
};

module.exports = {
  createComment,
  commentByVideoId,
};
