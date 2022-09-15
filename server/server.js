const express = require('express')
const Game = require('./models/Game')
const connectDB = require('./config/db')
require('dotenv').config({path: './config/.env'})

const app = express()
connectDB()

app.post('/game/start', async (req, res) => {
    console.log('game/start requested')
    try {
        const game = await Game.create({host: 'temp'})
        res.json(game)
    } catch (err) {
        console.log(err)
    }
})

PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})