const express = require('express')

const cors = require('cors')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
const motRouter = require('./routes/motsRoute')
const userRouter = require('./routes/userRoute')
const translationRouter = require('./routes/translationRoute')

//app.use(bodyparser.json())

const port = 5000


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })


app.use('/API/V1/mots', motRouter)

app.use('/API/V1/user' , userRouter)


app.use('/API/V1/translation', translationRouter)



