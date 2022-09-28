const Game = require('../models/Game')
const sockets = require('../webSocketServer')

let socketServer = sockets.getSocketServer()

const questions = [
    {
        question: '1 + 1',
        choices: [0, 1, 2, 3],
        answer: 2
    },
    {
        question: '2 + 2',
        choices: [2, 3, 4, 5],
        answer: 2
    },
    {
        question: '3 - 5',
        choices: [-2, -1, 0, 1],
        answer: 0
    }
]

module.exports = {
    create: async (req, res) => {
        console.log('/game/create requested')
        try {
            await Game.findOneAndDelete({ gameId: 1 })
            const game = await Game.create(
                {
                    gameId: 1,
                    questions: questions,
                    host: req.body.hostId
                })
            questions.forEach(() => game.submittedAnswers.push({}))
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
            game && game.addPlayer(req.body.playerId)
            socketServer = sockets.getSocketServer()
            socketServer.clients.forEach(client => client.send(JSON.stringify(game)))
            res.json(game)
        } catch (err) {
            console.log(err)
        }
    },
    leave: async (req, res) => {
        console.log('/game/leave requested')
        try {
            const game = await Game.findOne({ gameId: req.body.gameId })
            game && game.removePlayer(req.body.playerId)
            socketServer = sockets.getSocketServer()
            socketServer.clients.forEach(client => client.send(JSON.stringify(game)))
            res.json(game)
        } catch (err) {
            console.log(err)
        }
    },
    start: async (req, res) => {
        console.log('/game/start requested')
        try {
            const game = await Game.findOne({ gameId: req.body.gameId })
            await game.start()
            socketServer = sockets.getSocketServer()
            socketServer.clients.forEach(client => client.send(JSON.stringify(game)))
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
            socketServer = sockets.getSocketServer()
            socketServer.clients.forEach(client => client.send(JSON.stringify(game)))
            res.json(game)
        } catch (err) {
            console.log(err)
        }
    }
}