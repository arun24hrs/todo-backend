const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(req.headers.authorization, "token");
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if(decoded){
        req.body = {...req.body, userEmail: decoded.userEmail, userID: decoded.userID};
        next();
      } else {
        res.status(403).send({msg: "You do not have relevant permissions!"})
      }
    });
  } else {
    res.status(400).send({"msg": "Please login!"})
  }
};

module.exports = auth;
