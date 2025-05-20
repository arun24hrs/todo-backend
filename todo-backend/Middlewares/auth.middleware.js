const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if(decoded){
        req.body.userID = decoded.userID;
        req.body.userEmail = decoded.userEmail;
        next();
      } else {
        res.status(403).send({msg: "You do not have relevant permissions!"})
      }
    });
  } else {
    res.status(200).send({"msg": "Please login!"})
  }
};

module.exports = auth;
