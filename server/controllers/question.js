const Game = require('../models/Game')
const sockets = require('../webSocketServer')

let socketServer = sockets.getSocketServer()

module.exports = {
    next: async (req, res) => {
        console.log('/game/questions/next requested')
        try {
            const game = await Game.findOne(
                { gameId: req.body.gameId }
            )
            game && game.set({currentQuestion: game.currentQuestion + 1})
            await game.save()
            socketServer = sockets.getSocketServer()
            socketServer.clients.forEach(client => client.send(JSON.stringify(game)))
            console.log(game)
            res.json(game)
        } catch (err) {
            console.log(err)
        }
    },
    previous: async (req, res) => {
        console.log('/game/questions/next requested')
        try {
            const game = await Game.findOne(
                { gameId: req.body.gameId }
            )
            game && game.set({currentQuestion: game.currentQuestion - 1})
            await game.save()
            socketServer = sockets.getSocketServer()
            socketServer.clients.forEach(client => client.send(JSON.stringify(game)))
            res.json(game)
        } catch (err) {
            console.log(err)
        }
    }
}