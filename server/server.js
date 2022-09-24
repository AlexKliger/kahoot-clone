// Package imports
const express = require('express')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const WebSocket = require('ws')
// Route imports
const authRoutes = require('./routes/auth')
const gameRoutes = require('./routes/game')
// Config imports
const connectDB = require('./config/db')
require('./config/passport')(passport)
require('dotenv').config({path: './config/.env'})

const app = express()
connectDB()

// Express middleware
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
app.use(passport.initialize())
app.use(passport.session())

// Route middleware
app.use('/auth', authRoutes)
app.use('/game', gameRoutes)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

wsServer = new WebSocket.WebSocketServer({ server: server })
wsServer.on('connection', (ws, req) => {
    console.log('websocket connection made with address:', req.socket.remoteAddress)
})
