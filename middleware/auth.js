const jwt = require("jsonwebtoken");

const config = process.env;

 // importing user context
 const User = require("../model/user");

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
      // console.log(token)
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }  
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    //gan user vo req

    const email = decoded.email
    const user = await User.findOne({email});
    req.user = user;
    
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;