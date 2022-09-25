const Game = require('../models/Game')
const sockets = require('../webSocketServer')

let socketServer = sockets.getSocketServer()

const GAME_STATE = {
    WAITING_FOR_PLAYERS: 'waiting-for-players',
    GAME_STARTED: 'game-started'
}

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
            await game.save()
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
            const game = await Game.findOneAndUpdate(
                { gameId: req.body.gameId },
                { state: GAME_STATE.GAME_STARTED})
            await game.save()
            socketServer = sockets.getSocketServer()
            socketServer.clients.forEach(client => client.send(JSON.stringify(game)))
            res.json(game)
        } catch (err) {
            console.log(err)   
        }
    }
}