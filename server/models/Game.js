const mongoose = require('mongoose')
const { uid } = require('uid')
const GameSchema = new mongoose.Schema({
    players: {
        type: Array,
        default: []
    },
    state: {
        type: String,
        default: 'start'
    },
    gameId: {
        type: String,
        default: uid(8)
    }
})

module.exports = mongoose.model('Game', GameSchema)