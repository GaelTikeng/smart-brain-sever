const Question = require("../models/question");
const Option = require("../models/option");

// get all questions per quiz id
const getQuestion = async (req, res) => {
  const { quizId } = req.params;

  try {
    let allQuestions = await Question.findAll({
      where: {
        quizId: quizId,
      },
      include: {
        model: Option,
      },
    });

    res.send(allQuestions);
  } catch (err) {
    console.log("error occured while creating quiz", err);
  }
};

// create questions
const createQuestion = async (req, res) => {
  const allQuestion = req.body.allQuestion;

  console.log('front-end question', allQuestion)

  let kestion;
  console.log(allQuestion);

  try {
    kestion = await allQuestion?.map((kest) =>
      Question.create({
        question: kest.title,
        quizId: kest.quizId,
        id: kest.id,
        questionId: kest.id
      })
    );
  } catch (err) {
    console.log("error while creating question", err);
    throw err
  }
  // for (const quest of questions) {
  //   kestion = await Question.bulkCreate({question: quest})
  // }

  res.send("Questions posted successfully").status(200);
};

module.exports = {
  getQuestion,
  createQuestion,
};
