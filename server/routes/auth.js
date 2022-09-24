const express = require('express')
const passport = require('passport')
const authController = require('../controllers/auth')

const router = express.Router()

router.post('/createGuest', authController.createGuest)
router.post('/authenticate', passport.authenticate('local',
{
    failureRedirect: "/auth/authenticationFailed",
    successRedirect: "/auth/authenticationSucceeded"
}))
router.get('/authenticationFailed', authController.authenticationFailed)

module.exports = router