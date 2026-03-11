const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 5003
const mongoURL = process.env.mongoURL
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//database connection
mongoose.connect(mongoURL)
.then(()=> console.log('connected to MongoDb'))
.catch((error) => console.log(`Error connecting to MongoDb: ${error}`))

//server connection
async function startServer() {
    try {
        app.listen(PORT, () =>{
            console.log(`SUBSCRIPTION service started on port ${PORT}`)
        })
    } catch (error) {
        console.log('error starting server: ', error)
        process.exit(1)
    }
}

startServer()