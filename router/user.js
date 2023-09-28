const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const nodemailer = require("nodemailer")

const User = require("../models/user");
const Mailgen = require("mailgen");

router.post("/account/signup", async (req, res) => {
  let { username, email, password } = req.body;

  console.log("username", username)
  console.log("email", email)

  // sendiing email
  let config = {
    service: 'gmail', // email domain
    auth: {
      user: process.env.MY_GMAIL,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  }

  let transporter = nodemailer.createTransport(config)
  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Mailgen",
      link: 'https://mailgen.js'
    }
  })

  let response = {
    body: {
      name: "daily tuition",
      into: "Welcome to Smartbrain",
      table: {
        data: [
          {
            item: "SmartBrain",
            description: "An online quiz app",
            price: "free"
          }
        ]
      },
      outro: "looking forward to work with you"
    }
    
  }

  let mail = MailGenerator.generate(response)
  let message = {
    from: process.env.MY_GMAIL,
    to: email,
    subject: "Welcome to SmartBrain",
    text: "The quiz app that helps you create engaging and interactive quizzes that will asses your students knowledge understanding of your subject matter",
    html: mail
  }

  try {
    console.log("sending email")
    transporter.sendMail(message).then((info) => {
      console.log('email send successfully')
      return res.status(201).json({
        msg: "sent",
        info: info.messageId,
        previeuw: nodemailer.getTestMessageUrl(info)
      }).catch((err) => {
        console.log("error occured while sending email", err)
        return res.status(500).json({msg: err})
      })
    })

    const alreadyExistUser = await User.findOne({ where: { email } }).catch(
      (err) => console.log("error getting user", err)
    );
    if (alreadyExistUser) return res.send("User already exist with this same email");
    // console.log('this is hash:', hashedPassword)

    let hashedPassword = bcrypt.hashSync(password, 10)
    console.log('This is password by bcrypt', hashedPassword)

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const jwtoken = jwt.sign(
      {
        username: username,
        email: email,
        password: hashedPassword
      },
      process.env.MY_SECRET_KEY,
      {expiration: "1d"}
    );

    res.send({token: jwtoken});
  } catch (error) {
    console.log("error while creating user", error);
  }
});

module.exports = router;
