const express = require ('express')

const router = express.Router()

module.exports = router
const motsController = require('../controllers/motsController')
const userModel = require('../models/userModel')



//get all the words
router.get("/",  motsController.getAllwords )



 


//get a given word by id
router.get("/:id" , motsController.getOneWord )



//add one word 
router.post("/" , userModel.authenticateToken, motsController.addWord)

router.route("/")


//alter a word for a given id
router.put("/:id" , motsController.updateWord )


//delete a word for a given id 

router.delete("/:id" , motsController.deleteWord)



//delete all words 


router.delete("/" , motsController.deleteAllWords ) 