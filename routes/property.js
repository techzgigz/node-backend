const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property/index");
const validate = require("../util/joi");
const propertySchema = require("../controllers/property/validate");
var multer = require("multer")
const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: process.env.IMAGE_SIZE // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG|JPEG|GIF|gif)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
}
}) 
router.get("/getProperty",    propertyController.getProperty); 
router.post("/addProperty",  validate(propertySchema.addProperty), imageUpload.any('image'),propertyController.addProperty); 
module.exports = router;
