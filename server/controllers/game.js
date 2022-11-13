const Game = require('../models/Game')
const { uid } = require('uid')
const socketServer = require('../webSocketServer')
const QuestionGenerator = require('../question-generator/questionGenerator')

let io = socketServer.getSocketServer()

module.exports = {
    create: async (req, res) => {
        console.log('%c/game/create requested', 'color: green')
        try {
            const leftNumConfig = req.body.leftNumConfig
            const rightNumConfig = req.body.rightNumConfig
            const operatorConfig = req.body.operatorConfig
            const questions = []
            const questionGenerator = new QuestionGenerator(leftNumConfig, rightNumConfig, operatorConfig)
            for (let i = 0; i < 10; i++) {
                questions.push(questionGenerator.generateQuestionObject())
            }
            await Game.findOneAndDelete({ gameId: req.body.gameId })
            const game = await Game.create(
                {
                    gameId: uid(4),
                    questions: questions,
                    hostId: req.body.hostId
                })
            await game.save()
            res.json(game)
        } catch (err) {
            console.log(err)
        }
    },
    join: async (req, res) => {
        console.log('/game/join requested')
        try {
            const game = await Game.findOne({ gameId: req.body.gameId })
            game && game.addPlayer(req.body.playerId, req.body.playerName)
            io = socketServer.getSocketServer()
            io.to(req.body.gameId).emit('data', JSON.stringify(game))
            res.json(game)
        } catch (err) {
            console.log(err)
        }
    },
    leave: async (req, res) => {
        console.log('/game/leave requested')
        try {
            const game = await Game.findOne({ gameId: req.body.gameId })
            // If the host leaves, delete the game.
            if (req.body.playerId === game.hostId) {
                await game.delete()
                res.json({message: 'game deleted'})
            } else {
                game && game.removePlayer(req.body.playerId)
                io = socketServer.getSocketServer()
                console.log('   gameId:', req.body.gameId)
                io.to(req.body.gameId).emit('data', JSON.stringify(game))
                res.json(game)
            }
        } catch (err) {
            console.log(err)
        }
    },
    start: async (req, res) => {
        console.log('/game/start requested')
        try {
            const game = await Game.findOne({ gameId: req.body.gameId })
            await game.start()
            io = socketServer.getSocketServer()
            io.to(req.body.gameId).emit('data', JSON.stringify(game))
            res.json(game)
        } catch (err) {
            console.log(err)   
        }
    },
    reset: async (req, res) => {
        console.log('/game/reset requested')
        try {
            const game = await Game.findOne({gameId: req.body.gameId})
            await game.reset()
            io = socketServer.getSocketServer()
            io.to(req.body.gameId).emit('data', JSON.stringify(game))
            res.json(game)
        } catch (err) {
            console.log(err)
        }
    }
}