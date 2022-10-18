const Joi = require("joi");

const schemas = {
  videoAdd: Joi.object().keys({
    link: Joi.string().required(),
    title: Joi.string().required(),
    desc: Joi.string().required(),
    category: Joi.string().required(),
    youtubeId: Joi.string().required(),
    thumbnail: Joi.string().required(),
    status: Joi.string()
      .valid("In Approval", "Approved", "Published", "Rejected")
      .required(),
  }),
  videoByStatus: Joi.object().keys({
    status: Joi.string()
      .valid("In Approval", "Approved", "Published", "Rejected")
      .required(),
  }),
  videosUserName: Joi.object().keys({
    uploadedBy: Joi.string().required(),
  }),
  likeislike: Joi.object().keys({
    _id: Joi.string().required(),
  }),
  deleteVideo: Joi.object().keys({
    _id: Joi.string().required(),
    userId: Joi.string().required(),
  }),
  favourite: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  updateVideoStatus: Joi.object().keys({
    _id: Joi.string().required(),
    status: Joi.string()
      .valid("In Approval", "Approved", "Published", "Rejected")
      .required(),
  }),
};

module.exports = schemas;
