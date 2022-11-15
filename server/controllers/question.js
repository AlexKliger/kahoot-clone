const Game = require('../models/Game')
const sockets = require('../webSocketServer')

let io = sockets.getSocketServer()

module.exports = {
    next: async (req, res) => {
        console.log('/game/questions/next requested')
        try {
            const game = await Game.findOne({ gameId: req.body.gameId })
            game && await game.nextQuestion()
            io = sockets.getSocketServer()
            io.to(req.body.gameId).emit('data', JSON.stringify(game))
            res.json(game)
        } catch (err) {
            console.log(err)
        }
    },
    previous: async (req, res) => {
        console.log('/game/questions/previous requested')
        try {
            const game = await Game.findOne({ gameId: req.body.gameId })
            game && await game.prevQuestion()
            io = sockets.getSocketServer()
            io.to(req.body.gameId).emit('data', JSON.stringify(game))
            res.json(game)
        } catch (err) {
            console.log(err)
        }
    },
    submitAnswer: async (req, res) => {
        console.log('/game/questions/submitAnswer requested')
        try {
            // Find the game that contains the given question id.
            const game = await Game.findOne({ 'questions._id': req.params.questionId })
            game && await game.submitAnswer(req.params.questionId, req.body.playerId, req.body.answerIndex)
            io = sockets.getSocketServer()
            io.to(game.gameId).emit('data', JSON.stringify(game))
            res.json(game)
        } catch (err) {
            console.log(err)
        }
    }
}