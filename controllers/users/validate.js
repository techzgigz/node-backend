const Joi = require("joi");
const schemas = {
  userAdd: Joi.object().keys({
    phone: Joi.string().max(10).required(),
    firebaseUid: Joi.string().required(),
    fcmToken: Joi.string().required(),
    firstName: Joi.string().required(),
    surName: Joi.string().required(),
    userName: Joi.string().min(4).max(10).required(),
    gender: Joi.string().valid("Male", "Female", "Others").required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    status: Joi.string().valid("Active", "Suspended").required(),
  }),
  userLogin: Joi.object().keys({
    phone: Joi.string().max(10).required(),
    fcmToken: Joi.string().required(),
  }),
  userNameExists: Joi.object().keys({
    userName: Joi.string().min(4).max(10).required(),
  }),
  updateVideoCategory: Joi.object().keys({
    videoCategory: Joi.array().required(),
  }),
  updateUserStatus: Joi.object().keys({
    _id: Joi.string().required(),
    status: Joi.string().valid("Active", "Suspended").required(),
  }),
  followUnfollow: Joi.object().keys({
    followeeUserId: Joi.string().required(),
  }),
  favUnfav: Joi.object().keys({
    videoId: Joi.string().required(),
  }),
  getUserById: Joi.object().keys({
    _id: Joi.string().required(),
  }),
  adminLogin: Joi.object().keys({
    userName: Joi.string().required(),
    phone: Joi.string().max(10).required(),
  }),
};
module.exports = schemas;
