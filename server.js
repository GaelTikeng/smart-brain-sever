const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const createError = require("http-errors");
const app = express();
const User = require("./models/user");
const Quiz = require("./models/quiz");
const Participant = require("./models/participant");
const Question = require("./models/question");
const Option = require("./models/option");
const jwt = require ('jsonwebtoken')

require("./auth/password");

app.use(cors())
app.use(express.json());
app.use(morgan('dev'))

let userRouter = require("./router/user");
let loginRouter = require("./controllers/login");
// let participantRouter = require("./router/participantInfo");
let dashboardRouter = require('./router/dashboard')

let routes = require('./router/routes')

// view engine setup
app.set("view engine", "hps");

// const authMiddleWare = (req, res, next) => {
//   const token = req.headers.authorization.split(" ").pop();

//   if (token) {
//     jwt.verify(token)
//   } 

//   res.send("Invalid auth")

//   next()
// }

// middlewares
app.use("/", routes)
// app.use("/", userRouter);
// app.use("/", loginRouter);
// app.use("/", participantRouter);
// app.use('/', dashboardRouter)

app.get("/", (req, res) => {
  return res.json("From backend side");
});

app.listen(3000, () => {
  console.log("listening to port 3000");
});
