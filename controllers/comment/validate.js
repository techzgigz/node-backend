const Joi = require("joi");

const schemas = {
  commentAdd: Joi.object().keys({
    commentText: Joi.string().required(),
    videoId: Joi.string().required(),
  }),
  commentByVideoId: Joi.object().keys({
    videoId: Joi.string().required(),
  }),
};

module.exports = schemas;
