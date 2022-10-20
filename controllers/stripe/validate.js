const Joi = require("joi");
const schemas = {
  addPayment: Joi.object().keys({
    paymentMethodType: Joi.string().required(),
    currency: Joi.string().required(),
    amount: Joi.number().required()
  }),
};
module.exports = schemas;
