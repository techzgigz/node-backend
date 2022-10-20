const db = require("../../models");
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

    const { title, description } = req.body;
    let property = [{
      title: title,
      description: description
    }];

    property = await Property.bulkCreate(property)
 
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