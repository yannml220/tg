const express = require ('express')

const router = express.Router()

module.exports = router
const userController = require('../controllers/userController')
const userModel = require('../models/userModel')







router.post( "/login" ,    userController.login) 

router.post("/register" , userController.register )