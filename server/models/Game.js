const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    host: {
        type: String,
        required: true
    },
    players: {
        type: Array,
        default: []
    },
    state: {
        type: String,
        default: 'start'
    }
})

module.exports = mongoose.model('Game', GameSchema)