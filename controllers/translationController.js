const translationModel = require('../models/translationModel')



exports.getTranslation =  (req, res)  => {
    translationModel.getTranslation( req.params.searchedWord , res)
}