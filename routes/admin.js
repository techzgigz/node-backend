const express = require("express");
const router = express.Router();
const adminController = require("@app/controllers/admin/resolvers");
const adminSchema = require("@app/controllers/admin/validate");
const validate = require("@app/util/joi");
const { authorizeUser } = require("@app/util/authorize");

router.get("/getMetrics", adminController.getMetrics);
router.post(
  "/createFeeback",
  validate(adminSchema.createFeeback),
  authorizeUser,
  adminController.createFeeback
);
router.post(
  "/createFaq",
  validate(adminSchema.createFaq),
  adminController.createFaq
);

router.get("/getFeedback", adminController.getFeedback);
router.get("/getFaq", adminController.getFaq);
router.get("/getMetadata", adminController.getMetadata);
router.get("/getUserDetailedList", adminController.getUserDetailedList);
router.put(
  "/updateFeedback",
  validate(adminSchema.updateFeedback),
  adminController.updateFeedback
);
router.put(
  "/updateMetadata",
  validate(adminSchema.updateMetadata),
  adminController.updateMetadata
);
router.delete(
  "/deleteFaq",
  validate(adminSchema.deleteFaq),
  adminController.deleteFaq
);
router.post(
  "/saveVideoByAdmin",
  validate(adminSchema.videoAdd),
  adminController.saveVideoByAdmin
);
router.post("/sendPushNotofication", adminController.sendPushNotofication);
router.get("/getNotification", adminController.getNotification);
router.put("/updateAdminPassword", adminController.updateAdminPassword);
module.exports = router;
