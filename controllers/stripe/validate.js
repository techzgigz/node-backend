const Joi = require("joi");
const schemas = {
  addProperty: Joi.object().keys({ 
    title: Joi.string().required(),
    description: Joi.string().required(),
    published: Joi.bool().required()
  }),
  getProperty: Joi.object().keys({
    
  }),
};
module.exports = schemas;
