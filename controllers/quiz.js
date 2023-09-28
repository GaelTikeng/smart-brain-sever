const Quiz = require("../models/quiz");
const Question = require("../models/question");
const Option = require("../models/option");
const User = require("../models/user");

// get quizzes by id
const getQuizByID = async (req, res) => {
  const { id } = req.user;
  const quizId = req.params.quizId;

  const existingUser = await User.findOne({ where: { id } });

  if (existingUser !== null) {
    try {
      let quiz = await Quiz.findOne({
        where: { quizId: quizId },
        include: {
          model: [Question, Option],
        },
      });

      res.send(quiz);
    } catch (error) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  } else {
    res.status(404).send({ message: "Unauthorized! Sign up first" });
  }
};

// get quiz per userId
const getQuizzes = async (req, res) => {
  // const user = req.user;
  // console.log(req.user)
  const { userId } = req.params;

  try {
    const existingUser = await User.findOne({ where: { id: userId } });

    if (existingUser !== null) {
      const id = req.params.userId;

      console.log("this is id", id);
      const userQuiz = await Quiz.findAll({
        where: { userId: id },
      });

      return res.send(userQuiz);
    } else {
      console.log("user not exist");
      res.send("User does not exist");
    }
  } catch (err) {
    console.log("error while getting quiz", err);
    throw err;
  }
};

// post / create quiz
const createQuiz = async (req, res) => {
  const quiz = req.body.quiz;

  console.log("front-end quiz", quiz);
  console.log("one item of quiz array", quiz[0])

  try {
    await Quiz.create({
      id: quiz[0].id,
      userId: quiz[0].userId,
      title: quiz[0].title,
      questionId: quiz[0].questionId,
    });
  } catch (err) {
    console.log("An error occured while creating quiz", err);
    throw err;
  }

  res.status(200).send("Quiz posted successfully");
};

module.exports = {
  getQuizzes,
  createQuiz,
  getQuizByID,
};
