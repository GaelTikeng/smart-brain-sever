const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  let { username, email, password } = req.body;

  // hash pwd
  let hashedPassword = bcrypt.hashSync(password, 10);
  console.log("This is password by bcrypt", hashedPassword);

  // generating Token
  const jwtoken = jwt.sign(
    {
      email: email,
      password: password,
    },
    process.env.MY_SECRET_KEY,
    { expiresIn: "1d" }
  );

  await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.send({ token: jwtoken });
};


// get newly signed up user
const getCurrentUser = async (req, res) => {
  const { email } = req.body;

  try {
    let currentUser = await User.findOne({ where: { email: email } });

    res.send(currentUser);
  } catch (err) {
    console.log("something went wrong", err);
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  createUser,
  getCurrentUser,
};
