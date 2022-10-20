const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripe/index");
const validate = require("../util/joi");
const stripeSchema = require("../controllers/stripe/validate");

router.post("/webhook",   validate(stripeSchema.addPayment), stripeController.webhook); 
router.post("/create-payment-intent",   validate(stripeSchema.addPayment), stripeController.addPayment); 
module.exports = router;
