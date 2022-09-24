const LocalStrategy = require('passport-local')
const User = require('../models/User')

module.exports = function (passport) {
    console.log('passport.js')
    passport.use(new LocalStrategy(
      {
        idField: 'id'
      },
      async function verify(id, done) {
        console.log('verify( id:', id, ' ) -> user:', user)
          try {
            let user = await User.findOne({ _id: id })
            if (!user) {
              return done(null, false, {message: 'incorrect id'})
            }
            // User found.
            return done(null, user)
          } catch(err) {
            return done(err)
          }
      }
    ))

    passport.serializeUser(function(user, done) {
        process.nextTick(function() {
          user = {id: user._id}
          return done(null, user)
        });
      });
      
      passport.deserializeUser(function(user, done) {
        process.nextTick(function() {
          return done(null, user)
        });
      });
}