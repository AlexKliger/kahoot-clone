const mongoose = require('mongoose')
const { uid } = require('uid')
const QuestionSchema = require('./Question')
const PlayerSchema = require('./Player')

const Player = mongoose.model('Player', PlayerSchema)

const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started'
}

const methods = {
    addPlayer: async function (playerId) {
        // If the player does not already exist, add them to the game.
        !this.players.some(player => player.playerId === playerId)
            && this.players.push({ playerId: playerId })
        this.save()
        return this
    }
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
},
{
    methods: methods
})

module.exports = mongoose.model('Game', GameSchema)