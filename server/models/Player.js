const mongoose = require('mongoose')

PlayerSchema = mongoose.Schema({
    playerId: {
        type: String,
    },
    playerName: {
        type: String,
    },
    score: {
        type: Number,
        default: 0
    }
})

module.exports = PlayerSchema