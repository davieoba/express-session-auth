require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const AuthRoutes = require('./routes/auth-routes')
const UserRoutes = require('./routes/user-routes')
require('./utils/passport')
require('./utils/passport-local')
const { MONGODB_URI, SESSION_KEY } = require('./utils/config')
const helmet = require('helmet')

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log(`🚀🚀 Connected to MongoDB 🚀`)
  }).catch((err) => {
    console.log('😞❗ Error connecting to MongoDB', err)
  })


// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'dist')))


app.use(express.json())
app.use(cookieParser(SESSION_KEY))
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
/*
app.use(cookieSession({
  sameSite: 'strict',
  // secure: true,
  maxAge: 60 * 60 * 1000,
  expires: 60 * 60 * 1000,
  keys: [SESSION_KEY]
}))
*/

const sessionStore = MongoStore.create({
  mongoUrl: 'mongodb+srv://bodunrindavid:KMOLu7aD1JkIbl3q@cluster0.4p6cfxn.mongodb.net/express-session-auth?retryWrites=true&w=majority',
  collectionName: 'express-session'
})

app.use(expressSession({
  secret: SESSION_KEY,
  resave: false, // if you make a call and you don't update the store don't change the store
  saveUninitialized: false, // if you make a request and u are not adding anything to the session then it will not be added to the DB because the session will be empty
  store: sessionStore,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  }
}))

app.use(passport.initialize())
app.use(passport.session()) // this is what connects passport and my cookie session
app.use(helmet())

app.use('/api/v1/auth', AuthRoutes)
app.use('/api/v1', UserRoutes)

app.get('*', function (req, res) {
  res.sendFile('index.html', { root: path.join(__dirname, 'dist') })
})

module.exports = app