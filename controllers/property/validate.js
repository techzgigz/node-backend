const Joi = require("joi");
const schemas = {
  addProperty: Joi.object().keys({ 
    title: Joi.string().required(),
    description: Joi.string().required(),
    // published: Joi.bool().required()
    country: Joi.string().required(),
    state: Joi.string().required(),
    location: Joi.string().required(),
    pincode: Joi.string().required(),
    category: Joi.string().required(),
    size: Joi.number().required(),
    sizeType: Joi.number().required(),
    prppertyType: Joi.string().required(),
    price: Joi.number().required(),
    bedroom:Joi.number().required(),
    bathroom:Joi.number().required(),
    parking:Joi.number().required(),
    contactName:Joi.string().required(),
    contactNumber:Joi.string().required(),
    contactemail:Joi.string().required(),
    subscibe:Joi.string().required()
  }),
  getProperty: Joi.object().keys({
    
  }),
};
module.exports = schemas;
