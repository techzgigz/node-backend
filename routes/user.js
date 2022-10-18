const express = require("express");
const router = express.Router();
const userController = require("@app/controllers/users/resolvers");
const userSchema = require("@app/controllers/users/validate");
const validate = require("@app/util/joi");
const { authorizeUser } = require("@app/util/authorize");

router.post("/", validate(userSchema.userAdd), userController.saveUser);
router.get("/getAllUser", userController.getAllUser);
router.post("/login", validate(userSchema.userLogin), userController.loginUser);
router.post(
  "/userNameExists",
  validate(userSchema.userNameExists),
  userController.userNameExists
);
router.put(
  "/updateVideoCategory",
  validate(userSchema.updateVideoCategory),
  authorizeUser,
  userController.updateVideoCategory
);
router.put(
  "/updateUserProfile",
  authorizeUser,
  userController.updateUserProfile
);
router.put(
  "/updateUserStatus",
  validate(userSchema.updateUserStatus),
  userController.updateUserStatus
);
router.put(
  "/follow",
  validate(userSchema.followUnfollow),
  authorizeUser,
  userController.follow
);
router.put(
  "/unfollow",
  validate(userSchema.followUnfollow),
  authorizeUser,
  userController.unfollow
);
router.post(
  "/getUserById",
  validate(userSchema.getUserById),
  authorizeUser,
  userController.getUserById
);
router.post(
  "/getUserConnetionById",
  validate(userSchema.getUserById),
  authorizeUser,
  userController.getUserConnetionById
);
router.post(
  "/adminLogin",
  validate(userSchema.adminLogin),
  userController.loginAdmin
);

module.exports = router;
