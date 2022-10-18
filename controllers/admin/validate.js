const Joi = require("joi");

const schemas = {
  createFeeback: Joi.object().keys({
    createdBy: Joi.string().required(),
    feedbackText: Joi.string().required(),
  }),
  createFaq: Joi.object().keys({
    question: Joi.string().required(),
    answer: Joi.string().required(),
  }),
  updateFeedback: Joi.object().keys({
    _id: Joi.string().required(),
    replyText: Joi.string(),
    readByAdmin: Joi.bool(),
  }),
  updateMetadata: Joi.object().keys({
    toc: Joi.string(),
    tou: Joi.string(),
    privacyPolicy: Joi.string(),
  }),
  deleteFaq: Joi.object().keys({
    _id: Joi.string().required(),
  }),
  videoAdd: Joi.object().keys({
    link: Joi.string().required(),
    title: Joi.string().required(),
    desc: Joi.string().required(),
    category: Joi.string().required(),
    youtubeId: Joi.string().required(),
    thumbnail: Joi.string().required(),
    userId: Joi.string().required(),
    status: Joi.string()
      .valid("In Approval", "Approved", "Published", "Rejected")
      .required(),
  }),
};

module.exports = schemas;
