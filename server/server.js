// Package imports
const express = require('express')
const cors = require('cors')
const path = require('path')
// Route imports
const gameRoutes = require('./routes/game')
// Config imports
const connectDB = require('./config/db')
const sockets = require('./webSocketServer')
require('dotenv').config({path: './config/.env'})

const app = express()
connectDB()

// Express middleware
app.use(express.static(path.join(__dirname, '..', 'client', 'build')))
app.use(express.static('../client/public'))

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

// Route middleware
app.use('/game', gameRoutes)

app.get('*', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
    } catch (err) {
        console.log(err)
    }
})

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

sockets.initSocketServer(server)