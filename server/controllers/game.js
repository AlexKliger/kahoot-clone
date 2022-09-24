const Game = require('../models/Game')
const sockets = require('../webSocketServer')

let socketServer = sockets.getSocketServer()

module.exports = {
    create: async (req, res) => {
        console.log('/game/create requested')
        try {
            const game = await Game.create({gameId: 1})
            res.json(game)
        } catch (err) {
            console.log(err)
        }
    },
    join: async (req, res) => {
        console.log('/game/join requested')
        try {
            const game = await Game.findOne({ gameId: req.body.gameId })
            !game.players.includes(req.body.playerId) && game.players.push(req.body.playerId)
            await game.save()
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
            game && game.set({players: game.players.filter(playerId => playerId !== req.body.playerId)})
            game.save()
            socketServer = sockets.getSocketServer()
            socketServer.clients.forEach(client => client.send(JSON.stringify(game)))
            res.json(game)
        } catch (err) {
            console.log(err)
        }
    }
}