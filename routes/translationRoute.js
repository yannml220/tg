const express = require ('express')

const router = express.Router()

module.exports = router
const translationController = require('../controllers/translationController')
const userModel = require('../models/userModel')



//get all the words
router.get("/:searchedWord",  translationController.getTranslation )



 