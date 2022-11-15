const mongoose = require('mongoose')
const { uid } = require('uid')
const QuestionSchema = require('./Question')
const PlayerSchema = require('./Player')

const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started',
    GAME_ENDED: 'game-ended'
}

const methods = {
    start: async function () {
        if (this.state === GAME_STATE.WAITING_FOR_PLAYERS) {
            this.state = GAME_STATE.GAME_STARTED
        }
        this.save()
        return this
    },
    reset: async function () {
        this.currentQuestion = 0 // Reset to first question
        this.players.forEach(player => player.score = 0) // Reset scores
        this.questions.forEach(question => question.submittedAnswers = {}) // Reset answers
        this.state = GAME_STATE.WAITING_FOR_PLAYERS // Reset state
        this.save()
        return this
    },
    addPlayer: async function (playerId, playerName) {
        // If the player does not already exist, add them to the game.
        !this.players.some(player => player.playerId === playerId)
            && this.players.push({ playerId: playerId, playerName: playerName })
        await this.save()
        
        return this
    },
    removePlayer: async function (playerId) {
        const players = this.players.filter(player => player.playerId !== playerId)
        // If the player is part of the game, remove them.
        this.players.some(player => player.playerId === playerId)
            && this.set('players', players)
        await this.save()
        
        return this
    },
    nextQuestion: async function () {
        // Tally scores.
        const currentQuestion = this.questions[this.currentQuestion]
        this.players.forEach(player => {
            const playerAnswer = currentQuestion.submittedAnswers[player.playerId]
            // If player chooses the correct answer, increment score.
            if (playerAnswer) {
                (currentQuestion.answerIndex === playerAnswer.answerIndex) && player.score++
            }
        })
        if (this.currentQuestion >= this.questions.length - 1) {
            this.state = GAME_STATE.GAME_ENDED
        } else {
            this.currentQuestion++
        }

        await this.save()

        return this
    },
    prevQuestion: async function () {
        if (this.currentQuestion <= 0) return this

        this.currentQuestion--
        const currentQuestion = this.questions[this.currentQuestion]
        // "Untally" scores.
        this.players.forEach(player => {
            const playerAnswer = currentQuestion.submittedAnswers[player.playerId]
            // If player previously chose the correct answer, decrement score.
            if (playerAnswer) {
                (currentQuestion.answerIndex === playerAnswer.answerIndex) && player.score--
            }
        })
        await this.save()

        return this
    },
    submitAnswer: async function (questionId, playerId, answerIndex) {
        const question = this.questions.id(questionId)
        const submittedAnswers = {...question.submittedAnswers}
        submittedAnswers[playerId] = {
            answerIndex: answerIndex,
            timestamp: Date.now()
        }
        question.set({submittedAnswers: submittedAnswers})
        await this.save()

        return this
    }
}

const GameSchema = new mongoose.Schema({
    hostId: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: GAME_STATE.WAITING_FOR_PLAYERS
    },
    gameId: {
        type: String,
        default: uid(4)
    },
    players: {
        type: [PlayerSchema],
        default: []
    },
    currentQuestion: {
        type: Number,
        default: 0
    },
    questions: {
        type: [QuestionSchema],
    }
}, { methods: methods })

module.exports = mongoose.model('Game', GameSchema)