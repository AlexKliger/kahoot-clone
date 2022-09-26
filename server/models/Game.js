const mongoose = require('mongoose')
const { uid } = require('uid')
const QuestionSchema = require('./Question')
const PlayerSchema = require('./Player')

const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started'
}

const GameSchema = new mongoose.Schema({
    players: {
        type: [PlayerSchema],
        default: []
    },
    state: {
        type: String,
        default: GAME_STATE.WAITING_FOR_PLAYERS
    },
    questions: {
        type: [QuestionSchema],
        default: []
    },
    currentQuestion: {
        type: Number,
        default: 0
    },
    submittedAnswers: [{}],
    gameId: {
        type: String,
        default: uid(4)
    }
})

module.exports = mongoose.model('Game', GameSchema)