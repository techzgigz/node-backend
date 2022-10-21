const db = require("../../models/index");
const Property = db.property


const getProperty = async (req, res) => {
  try {
    const getProperty = await Property.findAll();
    res.send({
      data: { getProperty },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const addProperty = async (req, res) => {
  try {

    const { title, description ,country,state,location ,pincode
    ,category,size,sizeType,prppertyType,price,bedroom,bathroom,parking,contactName,contactNumber,contactemail
    ,subscibe} = req.body;
      
    
    let property = [{
      title, description ,country,state,location ,pincode
    ,category,size,sizeType,prppertyType,price,bedroom,bathroom,parking,contactName,contactNumber,contactemail
    ,subscibe
    }];
    if(req?.files){
      for (let index = 0; index < req?.files.length; index++) {
        if(req.files[index]){
          property["image"+(index+1)]  = process.env.BASE + req.files[index].filename;
       }
      }
    }
    property.status = true;
    property = await Property.create(property)
 
    res.send({
      data: { property  },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports = { 
  getProperty,addProperty
};