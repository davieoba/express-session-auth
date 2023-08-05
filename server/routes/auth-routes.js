const passport = require('passport')
const { checkCookie } = require('../utils/middleware')
const { register, login, forgotPassword, resetPassword } = require('../controllers/user-controller')
const router = require('express').Router()

router.get('/', (req, res, user) => {
  console.log('req.cookies = ', req.cookies)
  console.log('req.user =  ', req.user)
  console.log('req.session', req.session)
  res.send(req.cookies)
})

router.get('/hello', (req, res, next) => {
  // console.log('this is the session of the currenty logged in user', req.session)

  if (req.session.viewCount === undefined) {
    req.session.viewCount = 0
  } else {
    req.session.viewCount++
  }

  console.log(req.session)

  res.send(`the view count is ${req.session.viewCount}`)
})

const sign_in_with_jwt = (req, res, next) => {
  passport.authenticate('local', { session: true }, (err, user, info) => {
    if (err) throw err
    if (!user) return res.send("No User Exists")

    // it is either you make use of req.user || req.session but not the 2 of them (note: for server session makes use of session of course)
    // req.user = user
    req.session.user = user
    // console.log('req.session', req.session)

    return req.logIn(user, (err) => {
      if (err) throw err
      // console.log(req.user)
      req.user = user
      res.send('successfully authenticated')
    })

  })(req, res, next)
}

router.post('/register', register, sign_in_with_jwt)
router.post('/login', login, sign_in_with_jwt)

router.get('/logout', (req, res, next) => {
  req.logout()
  req.user = null
  res.cookie('connect.sid', '', {
    maxAge: 1
  })
  req.session.destroy(err => {
    if (err) {
      console.log('Error destroying session')
    }
    res.redirect('/')
  })
})

router.get('/check-cookie', checkCookie, (req, res, next) => {
  res.send('protected route accessible')
})

const sign_in_with_google = (req, res, next) => {
  passport.authenticate('google', {
    scope: ['openid', 'profile', 'email'],
    session: true
  })(req, res, next)
}  

router.get('/google', sign_in_with_google)

router.get('/google/redirect', sign_in_with_google, async (req, res, next) => {
  const expirationDate = new Date(Date.now() + 60 * 1000)

  // console.log({ expirationDate })
  console.log('req.user', req.user)
  req.session.user = req?.user
  res.cookie('token', 'some-cookie-very-serious-data', { secure: true, httpOnly: true, expires: expirationDate })

  res.end()
})

router.post('/forgot-password', forgotPassword)

router.post('/reset-password/:token', resetPassword)

module.exports = router