// const userModel = require("@app/models/users");
 
 

const saveUser = async (req, res, next) => {
   try{
    res.send({
      message: "Registered successfully"
    });
    next();
  } catch (err) {
     
  }
};
 

module.exports = {
  saveUser
};
