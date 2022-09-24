const passport = require('passport')
const User = require('../models/User')

module.exports = {
    createGuest: async (req, res) => {
        console.log('createGuestPlayer requested')
        try {
            const user = await User.create({isHost: req.body.isHost})
            res.json(user)
        } catch (err) {
            console.log(err)
        }
    },
    authenticate: 
        passport.authenticate('local',
        {
            failureRedirect: "/auth/authenticationFailed",
            successRedirect: "/auth/authenticationSucceeded"
        })
    ,
    authenticationFailed: async(req, res) => {
        try {
            res.json('authentication failed')
        } catch (err) {
            console.log(err)
        }
    },
    authenticationSucceeded: async(req, res) => {
        try {
            res.json('authentication succeeded')
        } catch (err) {
            console.log(err)
        }
    }
}