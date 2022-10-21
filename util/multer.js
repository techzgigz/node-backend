const multer = require("multer");
const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination:  'images' , 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() +  ".png" 
          )
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
  });
  module.exports = imageStorage