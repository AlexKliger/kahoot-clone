const Game = require('../models/Game')
const sockets = require('../webSocketServer')

module.exports = {
    next: async (req, res) => {
        console.log('/game/questions/next requested')
        try {
            res.json('/game/questions/next requested')
        } catch (err) {
            console.log(err)
        }
    }
}