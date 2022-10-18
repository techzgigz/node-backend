const userModel = require("@app/models/users");
const bcrypt = require("bcryptjs");
const { isNull } = require("@app/util/check");
const { createToken } = require("@app/controllers/users/util");

const saveUser = async (req, res, next) => {
  const {
    phone,
    firebaseUid,
    fcmToken,
    firstName,
    surName,
    userName,
    gender,
    city,
    state,
    status,
  } = req.body;

  try {
    const foundUser = await userModel.phoneExist(phone);

    if (!isNull(foundUser))
      throw { status: 400, message: "User alrteady exists" };

    // adding new user
    const user = userModel({
      phone,
      firebaseUid,
      fcmToken,
      firstName,
      surName,
      userName,
      gender,
      city,
      state,
      status,
    });
    await user.save();
    const accessToken = createToken(user);
    res.send({
      message: "Registered successfully",
      data: { accessToken, user },
    });
    next();
  } catch (err) {
    console.log(err);
    console.log(err);
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  const { phone, fcmToken } = req.body;

  try {
    const user = await userModel.findOneAndUpdate(
      { phone },
      { lastLogin: new Date(), fcmToken }
    );
    if (isNull(user)) throw { status: 400, message: "User not found" };
    const foundUser = await userModel.findOne({ phone });

    const accessToken = createToken(user);

    res.send({ data: { accessToken, user: foundUser } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const loginAdmin = async (req, res, next) => {
  const { userName, phone } = req.body;

  try {
    const user = await userModel.findOneAndUpdate(
      { userName, phone },
      { lastLogin: new Date() }
    );
    if (isNull(user)) throw { status: 400, message: "Invalid credential" };
    const foundUser = await userModel.findOne({ phone });

    const accessToken = createToken(user);

    res.send({ data: { accessToken, user: foundUser } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const userList = await userModel
      .find({ userName: { $ne: "admin" } })
      .sort({ onboardTimestamp: -1 })
      .exec();

    res.send({ data: { userList, count: userList.length } });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const userNameExists = async (req, res, next) => {
  const { userName } = req.body;

  try {
    const foundUser = await userModel.findOne({ userName });
    if (isNull(foundUser)) throw { status: 400, message: "User not found" };

    res.send({ data: foundUser });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateVideoCategory = async (req, res, next) => {
  const { videoCategory } = req.body;
  try {
    const user = await userModel.findOneAndUpdate(
      { userName: req.user.userName },
      { $set: { videoCategory: videoCategory } }
    );
    if (isNull(user)) throw { status: 400, message: "User not found" };
    const foundUser = await userModel.findOne({ userName: req.user.userName });
    res.send({ data: foundUser });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { userName: req.user.userName },
      { $set: req.body },
      { upsert: true }
    );
    if (isNull(user)) throw { status: 400, message: "User not found" };
    const foundUser = await userModel.findOne({ userName: req.user.userName });

    res.send({ data: foundUser });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const updateUserStatus = async (req, res, next) => {
  const { _id, status } = req.body;
  try {
    const user = await userModel.findOneAndUpdate(
      { _id },
      { $set: { status } },
      { upsert: true }
    );
    if (isNull(user)) throw { status: 400, message: "User not found" };

    res.send({ message: "Status updated" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const follow = async (req, res, next) => {
  const { followeeUserId } = req.body;
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: followeeUserId },
      { $addToSet: { follower: req.user._id } }
    );
    if (isNull(user)) throw { status: 400, message: "Followee not found" };

    const me = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { $addToSet: { following: followeeUserId } }
    );
    if (isNull(me)) throw { status: 400, message: "Follower not found" };

    const foundUser = await userModel.findOne({ _id: req.user._id });

    res.send({ message: "Followed", foundUser });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const unfollow = async (req, res, next) => {
  const { followeeUserId } = req.body;
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: followeeUserId },
      { $pull: { follower: req.user._id } }
    );
    if (isNull(user)) throw { status: 400, message: "Followee not found" };

    const me = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { following: followeeUserId } }
    );
    if (isNull(me)) throw { status: 400, message: "Follower not found" };

    const foundUser = await userModel.findOne({ _id: req.user._id });

    res.send({ message: "Unfollowed", foundUser });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  const { _id } = req.body;

  try {
    const foundUser = await userModel
      .findOne({ _id })
      .populate({ path: "uploadedVideo", populate: { path: "uploadedBy" } })
      .populate({
        path: "uploadedVideo",
        populate: { path: "comment", populate: { path: "userId" } },
      });
    if (isNull(foundUser)) throw { status: 400, message: "User not found" };

    res.send({ data: foundUser });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getUserConnetionById = async (req, res, next) => {
  const { _id } = req.body;

  try {
    const foundUser = await userModel
      .findOne({ _id })
      .populate({ path: "follower" })
      .populate({ path: "following" });
    if (isNull(foundUser)) throw { status: 400, message: "User not found" };

    res.send({
      data: { follower: foundUser.follower, following: foundUser.following },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  saveUser,
  loginUser,
  userNameExists,
  updateVideoCategory,
  updateUserProfile,
  updateUserStatus,
  follow,
  unfollow,
  getUserById,
  getUserConnetionById,
  loginAdmin,
  getAllUser,
};
