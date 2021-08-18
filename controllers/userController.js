const express = require('express')
const userModel = require('../models/userModel')

const dbconnection = require('../database/database.config')





exports.login = ( req , res) => {
    userModel.login(req.body.username , req.body.password  , res)

}


exports.register = (req , res) => {
    userModel.register(req.body.username , req.body.password , req.body.email , res)
}


