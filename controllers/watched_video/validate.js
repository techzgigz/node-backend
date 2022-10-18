const Joi = require("joi");

const schemas = {
  watchAdd: Joi.object().keys({
    videoId: Joi.string().required(),
    playedTime: Joi.number().required(),
    playedPercent: Joi.number().required(),
  }),
  partiallyWatched: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

module.exports = schemas;
