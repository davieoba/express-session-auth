const passport = require('passport')
const PassportLocal = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user-model')

passport.serializeUser((user, done) => {
  console.log('serialize user', { user })
  // done(null, user.id)
  done(null, { id: user.id, email: user.email })
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(new PassportLocal({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
  // console.log({ email, password })
  const user = await User.findOne({ email: email })

  if (!user) return done(null, false)

  const auth = await bcrypt.compare(password, user.password)

  if (!auth) {
    return done(null, false)
  }

  return done(null, user)
}))
