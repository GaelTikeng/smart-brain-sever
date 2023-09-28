const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } })

    if (user === null) {
      return res.json({ message: "Wrong Email or Password" });
    }

    let isSamePwd = bcrypt.compareSync(password, user.password);
    console.log(isSamePwd)
    console.log(typeof isSamePwd)
    if (isSamePwd) {
      return res.json({ message: "Wrong email or password" });
    }

    const jwtoken = jwt.sign(
      {
        email: email,
        password: password,
      },
      process.env.MY_SECRET_KEY,
      { expiresIn: "1d" }
    );

    console.log("This is the tokken", jwtoken)
    res.send({ message: "Welcome back", token: jwtoken });
  } catch (error) {
    console.log("An error occured while signing in user", error);
    throw error
  }
};

// get user info
router.get("/user/login", async (req, res) => {
  const email = req.body["Email Address"];
  console.log("this is email", email);
  let userInfo = await User.findOne({ where: { email } }).catch((err) =>
    console.log("An error occured", err)
  );

  res.send(userInfo);
});

// router.get("/users/login", async (req, res) => {
//   let users = await User.findAll()
//   res.send(users)
// })

module.exports = { login };
