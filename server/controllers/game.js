const Game = require('../models/Game')
const { uid } = require('uid')
const socketServer = require('../webSocketServer')
const generateQuestions = require('../question-generator/questionGenerator')

let io = socketServer.getSocketServer()

async function create(req, res) {
    console.log('/game/create requested')
    try {
        const questions = generateQuestions(req.body.configs, 10)
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
}

async function join(req, res) {
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
}

async function leave(req, res) {
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
}

async function start(req, res) {
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
}

async function reset(req, res) {
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

module.exports = {
    create,
    join,
    leave,
    start,
    reset
}