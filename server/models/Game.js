const mongoose = require('mongoose')
const { uid } = require('uid')
const QuestionSchema = require('./Question')
const PlayerSchema = require('./Player')

const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started'
}

const methods = {
    addPlayer: async function (playerId) {
        // If the player does not already exist, add them to the game.
        !this.players.some(player => player.playerId === playerId)
            && this.players.push({ playerId: playerId })
        await this.save()
        
        return this
    },
    removePlayer: async function (playerId) {
        // If the player is part 
        this.players.some(player => player.playerId === playerId)
            && this.players.filter(player => player.id !== playerId)
        await this.save()

        return this
    },
    nextQuestion: async function () {
        if (this.currentQuestion >= this.questions.length - 1) return this

        this.players.forEach(player => {
            const playerAnswer = this.submittedAnswers[this.currentQuestion][player.playerId]
            const correctAnswer = this.questions[this.currentQuestion].answer
            // If player chooses the correct answer, increment score.
            playerAnswer === correctAnswer && player.score++
        })
        this.currentQuestion++
        await this.save()

        return this
    },
    prevQuestion: async function () {
        if (this.currentQuestion <= 0) return this

        this.currentQuestion--
        this.players.forEach(player => {
            const playerAnswer = this.submittedAnswers[this.currentQuestion][player.playerId]
            const correctAnswer = this.questions[this.currentQuestion].answer
            // If player chose the correct answer, decrement score.
            playerAnswer === correctAnswer && player.score--
        })
        await this.save()

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