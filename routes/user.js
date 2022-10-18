const express = require("express");
const router = express.Router();
const userController = require("@app/controllers/users/resolvers");


router.post("/",   userController.saveUser); 
module.exports = router;
