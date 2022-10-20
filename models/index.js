const db = require("../util/db.js");

db.property = require("./property.js")(db.sequelize, db.Sequelize);

module.exports = db;