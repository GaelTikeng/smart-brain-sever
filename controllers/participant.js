const express = require("express");
const router = express.Router();
const Participant = require("../models/participant");

// Create student
const createParticipant = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const { quizId } = req.params;

  try {
    console.log("My name is :", name);
    console.log("participant email :", email);
    await Participant.create({
      name: name,
      email: email,
      quizId: quizId,
    });

    let studentCedential = {
      participantName: name,
      participantEmail: email,
    };

    res.send(studentCedential);
  } catch (error) {
    console.log("could not save student credentials", error);
    throw error;
  }
};

// get the participant info
const getParticipant = async (req, res) => {
  const name = req.body.name;

  console.log("this is name", name);
  try {
    let info = await Participant.findOne({
      attributes: ["name", "id", "email"],
      where: { name },
    });
    res.send(info).status(200);
  } catch (err) {
    console.log("Could not get student info", err);
  }
};

// post participant score and timeSpent
const updateParticipant = async (req, res) => {
  const { timeSpent, score, name, quizId, userId } = req.body;

  try {
    await Participant.update(
      {
        userId: userId,
        quiId: quizId,
        score: score,
        timeSpent: timeSpent,
      },
      {
        where: {
          name: name,
        },
      }
    );
    res.send("Successfully sent data");
  } catch (err) {
    console.log("could not update");
    res.send("Something went wrong").status(500);
  }
};

// get participant's score per userId
const getStudentPerformance = async (req, res) => {
  let { userId } = req.body;
  console.log("this is user iid", userId);

  try {
    const allStudents = await Participant.findAll({
      where: { userId: userId },
    });

    res.send(allStudents).status(200);
  } catch (error) {
    console.log("Unable to get all students", error);
  }
};

module.exports = {
  createParticipant,
  getParticipant,
  updateParticipant,
  getStudentPerformance,
};
