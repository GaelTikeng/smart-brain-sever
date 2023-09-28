const { DataTypes } = require("sequelize");
const sequel = require('../db')
const Quiz = require("./quiz");

const Participant = sequel.define("participant", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  score: {
    type: DataTypes.INTEGER,
  },
  quizId: {
    type: DataTypes.STRING,
  },
  timeSpent: {
    type: DataTypes.STRING,
  }
});

// creating a junction table ParticipantQuiz
const ParticipantQuiz = sequel.define(
  "participant_quiz",
  {},
  { timestamps: false }
);

// many-to-many association
Quiz.belongsToMany(Participant, { through: ParticipantQuiz });
Participant.belongsToMany(Quiz, { through: ParticipantQuiz });

sequel
  .sync()
  .then(() => {
    console.log("Participant Table created successfully");
  })
  .catch((error) => {
    console.log("error occured while creating table: ", error);
  });

module.exports = Participant;
