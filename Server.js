const express = require('express')
const connectToMongoDB = require('./Database/Connecttomongodb')
const colors = require('colors')
const authroutes = require('./Routes/user.routes')
const dotenv = require('dotenv')
const cosr = require('cors')


const app = express()
app.use(cosr())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
dotenv.config()

app.use('/api/v1/auth', authroutes)


connectToMongoDB()


PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})