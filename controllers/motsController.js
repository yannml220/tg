const express = require('express')
const motsModel = require('../models/motsModel')
const dbconnection = require('../database/database.config')



exports.getAllwords =  (req, res)  => {
    motsModel.getAll(res , req.body.listeId)
}



exports.getOneWord = ( req , res ) => {
    motsModel.getById(req.params.id , res)

}



exports.addWord = ( req ,res ) => {

    motsModel.create(req.body.libelle , req.body.traduction , req.body.listeId , res)

}



exports.updateWord = ( req , res ) => {
    motsModel.update(req.params.id , req.body.libelle , req.body.traduction , res )
}


exports.deleteWord = ( req , res) => {

    motsModel.delete(req.params.id , res)
}



exports.deleteAllWords = ( req , res)  => {

    motsModel.deleteAll(res)
}