const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property/index");
const validate = require("../util/joi");
const propertySchema = require("../controllers/property/validate");

router.get("/getProperty",    propertyController.getProperty); 
router.post("/addProperty",  validate(propertySchema.addProperty), propertyController.addProperty); 
module.exports = router;
