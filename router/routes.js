const { createUser, getCurrentUser } = require("../controllers/users");
const { login } = require("../controllers/login");
const express = require("express");
const router = express.Router();

const pool = require('./pool')

const { createParticipant, getParticipant, updateParticipant, getStudentPerformance } = require("../controllers/participant");
const { getQuizzes, createQuiz, getQuizByID } = require("../controllers/quiz");

const { getQuestion, createQuestion } = require("../controllers/question");

const { createOption } = require("../controllers/option");

const AuthMiddleWare = require("../middlewares/authMiddleWares");

// non protected routes
router.post("/account/signup", createUser);
router.post("/account/login", login);
router.post("/currentUser", getCurrentUser);
router.get("/getStudentInfo", getParticipant)
router.post("/student", createParticipant)
router.get("/dashboard/:userId/:quizId", getQuestion);
router.post("/update", updateParticipant)
router.get("/getStudents", getStudentPerformance)

// protected routes
router.use(AuthMiddleWare);
router.get("/dashboard/:userId", getQuizzes);
router.get("/dashboard/:quizId", getQuizByID);
router.post("/dashboard/:userId/create-quiz", createQuiz);
router.post("/dashboard/:userId/create-question", createQuestion);
router.post("/dashboard/:userId/create-option", createOption);



module.exports = router;
