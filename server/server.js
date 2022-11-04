// Package imports
const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
// Route imports
const gameRoutes = require('./routes/game')
// Config imports
const connectDB = require('./config/db')
const sockets = require('./webSocketServer')
require('dotenv').config({path: './config/.env'})

const app = express()
connectDB()

// Express middleware
app.use(express.static(path.join(__dirname, '../client/build')))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
// Authentication middleware
app.use(
    session({
        secret: 'charlie browneyes',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongooseConnection: mongoose.connection})
    })
)

// Route middleware
app.use('/game', gameRoutes)

app.get('/*', (req, res) => {
    try {
        res.sendFile(__dirname + '/../client/build/index.html')
    } catch (err) {
        console.log(err)
    }
})

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

sockets.initSocketServer(server)