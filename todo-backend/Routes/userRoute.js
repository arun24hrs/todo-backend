const { Router } = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../Model/userModel");
require("dotenv").config();
const jwt = require("jsonwebtoken")

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (email !== undefined) {
    const userExist = await UserModel.findOne({ email });
    console.log(userExist, "user");
    if (!userExist) {
      bcrypt.hash(password, 5, async function (err, hash) {
        console.log(hash, "hash");
        if (hash) {
          const user = await UserModel({ email, password: hash });
          await user.save();
          res.status(201).send({ message: "User Registered Successfully!" });
        } else {
          res.status(500).send({ error: "Something went wrong!" });
        }
      });
    } else {
      res.status(200).send({ message: "User already registered!" });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body; //arun.k@meritto.com wqerwetl234
  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
        bcrypt.compare(password, userExist.password, function (err, result) {
      if(result){
        const token = jwt.sign({userID: userExist._id, userEmail: userExist.email}, process.env.SECRET_KEY);
        res.status(201).send({msg: "Login Successful!", "token": `Bearer ${token}`})
      } else {
         res.status(200).send({msg: "Wrong Credentials!"});
      }
    });
    } else {
        res.status(200).send({msg: "No usesr found!"});
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({msg: "Something went wrong!"})
  }
});

module.exports = userRouter;
