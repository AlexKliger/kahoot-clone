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
            io.sockets.emit(JSON.stringify(game))
            res.json(game)
        } catch (err) {
            console.log(err)
        }
    },
    previous: async (req, res) => {
        console.log('/game/questions/next requested')
        try {
            const game = await Game.findOne({ gameId: req.body.gameId })
            game && await game.prevQuestion()
            io = sockets.getSocketServer()
            io.sockets.emit(JSON.stringify(game))
            res.json(game)
        } catch (err) {
            console.log(err)
        }
    },
    submitAnswer: async (req, res) => {
        console.log('/game/questions/submitAnswer requested')
        try {
            const game = await Game.findOne({ gameId: req.body.gameId })
            const submittedAnswers = game.submittedAnswers
            submittedAnswers[game.currentQuestion][req.body.playerId] = req.body.answer
            await Game.findOneAndUpdate(
                { gameId: req.body.gameId },
                { submittedAnswers: submittedAnswers })
            res.json({message: 'answer submitted'})
        } catch (err) {
            console.log(err)
        }
    }
}