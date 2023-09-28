const {Sequelize} = require('sequelize')
require('dotenv').config()


// console.log("this is the process", process.env)
const sequel = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
  }
)

sequel
  .authenticate()
  .then(() => {
    console.log('Connection to db successful')
  })
  .catch((error) => {
    console.error('unable to connect to DB: ', error)
  })


  module.exports = sequel 