const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const config = require('./config')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(new GoogleStrategy({
  callbackURL: '/api/v1/auth/google/redirect',
  clientID: config.GOOGLE_PLUS_CLIENT_ID,
  clientSecret: config.GOOGLE_PLUS_CLIENT_SECRET
}, async function (accessToken, refreshToken, profile, done) {
  const user = await User.findOne({ googleId: profile.id })

  if (user) return done(null, user)

  // #!user

  const newUser = new User()
  newUser.name = profile.displayName
  newUser.email = profile._json.email
  newUser.googleId = profile.id
  newUser.photo = profile._json.picture
  // create an extremely random password making use of the user's credential recieved from google.
  newUser.password = await bcrypt.hash(accessToken, 10)

  newUser.save().then((user) => {
    return done(null, user)
  })
}))