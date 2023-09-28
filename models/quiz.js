const { DataTypes } = require("sequelize");
const sequel = require("../db");
const User = require('./user')


const Quiz = sequel.define('quiz', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER
  },
  questionId: {
    type: DataTypes.STRING
  }
})

User.hasMany(Quiz)
Quiz.belongsTo(User)

sequel
  .sync()
  .then(() => {
    console.log("Quiz table created successfully")
  })
  .catch((error) => {
    console.log("error occured while creating table", error)
  })

module.exports = Quiz;