const express = require('express')
const router = express.Router()
const Quiz = require('../models/quiz')
const Question = require('../models/question')


router('/dashboard/:token/', async (req, res) => {

  

  try {

  }
  catch (error) {
    console.log ('An error occured while creating question', error)
  }
})