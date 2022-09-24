const Game = require('../models/Game')

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
            !game.players.includes(req.body.userId) && room.players.push(req.body.playerId)
            await game.save()
            res.json(game)
        } catch (err) {
            console.log(err)
        }
    }
}