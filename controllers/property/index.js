const db = require("../../models");
const Property = db.property


const getProperty = (req, res) => {
  Property.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

module.exports = { 
  getProperty,
};