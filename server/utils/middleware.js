exports.checkCookie = (req, res, next) => {

  if (req.user) {
    // console.log(req.cookies)
    // console.log(req.session)
    // console.log(req.signedCookies)
    next()
  } else {
    // send a false response to the user and then attach this url to the json response
    return res.status(401).json({
      message: 'Invalid Credentials, your email or password is not correct',
      redirectUrl: 'http://localhost:5000/auth/login'
    })
    // res.redirect('http://localhost:5173/auth/login')
  }
}

exports.restrictedRole = (req, res, next) => {
  if (req.user.role !== 'admin') {
    // stop the user from accessing this place
    return res.status(401).json({
      message: 'unauthorized access'
    })
  }

  next()
}