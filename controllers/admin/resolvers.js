const userModel = require("@app/models/users");
const feedbackModel = require("@app/models/feedback");
const faqModel = require("@app/models/faq");
const notificationModel = require("@app/models/notifications");
const metadataModel = require("@app/models/metadata");
const bcrypt = require("bcryptjs");
const { isNull, isUndefinedOrNullOrEmptyOrNoLen } = require("@app/util/check");
const videoModel = require("@app/models/videos");
const { sendfcmNotification } = require("@app/controllers/users/util");

const getMetrics = async (req, res, next) => {
  try {
    var date = new Date();
    var last = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
    const videoLast7day = await videoModel.count({
      uploadTimestamp: { $gt: last },
    });
    last = new Date(date.getTime() - 30 * 24 * 60 * 60 * 1000);
    const videoLast30day = await videoModel.count({
      uploadTimestamp: { $gt: last },
    });
    const totalUser = await userModel.count({
      userName: { $ne: "admin" },
    });
    const activeUser = await userModel.count({
      userName: { $ne: "admin" },
      status: "Active",
    });
    const suspendedUser = await userModel.count({
      userName: { $ne: "admin" },
      status: "Suspended",
    });
    const unreadFeedback = await feedbackModel.count({
      readByAdmin: false,
    });
    const totalVideo = await videoModel.count();
    const inApprovalVideo = await videoModel.count({ status: "In Approval" });
    const publishedVideo = await videoModel.count({ status: "Published" });
    const suspendedVideo = await videoModel.count({ status: "Rejected" });
    res.send({
      data: {
        videoLast7day,
        videoLast30day,
        totalUser,
        activeUser,
        suspendedUser,
        totalVideo,
        inApprovalVideo,
        publishedVideo,
        suspendedVideo,
        unreadFeedback,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const createFeeback = async (req, res, next) => {
  const { createdBy, feedbackText } = req.body;

  try {
    const feedback = feedbackModel({
      feedbackText,
      createdBy,
    });
    await feedback.save();
    res.send({
      message: "Feedback submitted",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getFeedback = async (req, res, next) => {
  try {
    const feedbackList = await feedbackModel
      .find()
      .sort({ readByAdmin: 1 })
      .populate({ path: "createdBy" })
      .exec();

    res.send({
      data: { feedbackList },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateFeedback = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const feedback = await feedbackModel.findOneAndUpdate(
      { _id },
      { $set: req.body },
      { upsert: true }
    );
    if (isNull(feedback)) throw { status: 400, message: "Feedback not found" };
    if (!isUndefinedOrNullOrEmptyOrNoLen(req.body.replyText)) {
      let user = await userModel.findOne({ _id: feedback.createdBy });
      var notificationBody =
        feedback.feedbackText + "\n\n" + req.body.replyText;
      let data = {};
      if (isNull(user)) throw { status: 400, message: "User not found" };
      await sendfcmNotification(
        "Reply on your feedback",
        notificationBody,
        data,
        user.fcmToken
      );
    }
    res.send({
      message: "Feedback updated",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const createFaq = async (req, res, next) => {
  const { question, answer } = req.body;

  try {
    const faq = faqModel({
      question,
      answer,
    });
    await faq.save();
    res.send({
      message: "FAQ added",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteFaq = async (req, res, next) => {
  const { _id } = req.body;

  try {
    const faq = await faqModel
      .findOne({
        _id,
      })
      .remove();
    if (isNull(faq)) throw { status: 400, message: "FAQ not found" };
    res.send({
      message: "Deleted",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getFaq = async (req, res, next) => {
  try {
    const faqList = await faqModel.find().exec();

    res.send({
      data: { faqList },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateMetadata = async (req, res, next) => {
  try {
    const metadata = await metadataModel.findOneAndUpdate(
      { _id: "62b974251c1278bbb4c3bc7a" },
      { $set: req.body },
      { upsert: true }
    );
    if (isNull(metadata)) throw { status: 400, message: "Metadata not found" };
    res.send({
      message: "Updated",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const getMetadata = async (req, res, next) => {
  try {
    const metadata = await metadataModel.findOne({
      _id: "62b974251c1278bbb4c3bc7a",
    });
    if (isNull(metadata)) throw { status: 400, message: "Metadata not found" };
    res.send({
      data: { metadata },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getUserDetailedList = async (req, res, next) => {
  try {
    const userList = await userModel.aggregate([
      {
        $match: {
          userName: {
            $ne: "admin",
          },
        },
      },
      {
        $sort: {
          onboardTimestamp: -1,
        },
      },
      {
        $lookup: {
          from: "watchedvideos",
          localField: "_id",
          foreignField: "userId",
          as: "watchedvideos",
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "favourite",
          as: "favourites",
        },
      },
    ]);

    res.send({ data: { userList, count: userList.length } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const saveVideoByAdmin = async (req, res, next) => {
  const { link, title, desc, category, youtubeId, thumbnail, status, userId } =
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
      uploadedBy: userId,
    });
    await video.save();

    await userModel.findOneAndUpdate(
      { _id: userId },
      {
        $addToSet: {
          uploadedVideo: video._id,
        },
      }
    );
    res.send({
      message: "Video is posted and published",
      data: video,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const sendPushNotofication = async (req, res, next) => {
  const { userList, notificationBody } = req.body;
  try {
    const noti = notificationModel({ userList, notificationBody });
    await noti.save();
    for (const element of userList) {
      let user = await userModel.findOne({ _id: element });
      let data = {};
      if (isNull(user)) throw { status: 400, message: "User not found" };
      await sendfcmNotification(
        "Message from Admin",
        notificationBody,
        data,
        user.fcmToken
      );
    }
    res.send({ message: "Notification sent" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getNotification = async (req, res, next) => {
  try {
    const notificationList = await notificationModel
      .find()
      .sort({ createdAt: -1 })
      .populate({ path: "userList" })
      .exec();

    res.send({
      data: { notificationList, count: notificationList.length },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateAdminPassword = async (req, res, next) => {
  const { oldPhone, phone } = req.body;
  try {
    const user = await userModel.findOneAndUpdate(
      { phone: oldPhone, userName: "admin" },
      { phone }
    );
    if (isNull(user)) throw { status: 400, message: "Invalid credential" };
    res.send({
      message: "Password is updated",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  getMetrics,
  createFeeback,
  getFeedback,
  updateFeedback,
  createFaq,
  getFaq,
  updateMetadata,
  getMetadata,
  deleteFaq,
  getUserDetailedList,
  saveVideoByAdmin,
  sendPushNotofication,
  getNotification,
  updateAdminPassword,
};
