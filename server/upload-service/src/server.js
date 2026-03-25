const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const path = require('path')


dotenv.config({ path: path.resolve(__dirname, '../.env') })

const mediaRoutes = require('./routes/upload-routes')

const PORT = process.env.PORT || 5003
const mongoURL = process.env.mongoURL
const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/api/media', mediaRoutes)

//database connection
mongoose.connect(mongoURL)
.then(()=> console.log('connected to MongoDb'))
.catch((error) => console.log(`Error connecting to MongoDb: ${error}`))

//server connection
async function startServer() {
    try {
        if (!process.env.CLOUDINARY_API_KEY) {
            console.warn('CLOUDINARY_API_KEY is missing. Check server/upload-service/.env loading.')
        }

        app.listen(PORT, () =>{
            console.log(`UPLOAD service started on port ${PORT}`)
        })
    } catch (error) {
        console.log('error starting server: ', error)
        process.exit(1)
    }
}

startServer()
