const express = require("express");
const router = express.Router();
const userController = require("../controllers/users/resolvers");


router.get("/",   userController.saveUser); 
module.exports = router;
