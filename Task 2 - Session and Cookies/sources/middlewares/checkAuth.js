const checkAuth = (req, res, next) => {
  const currentUser = req.session?.user

  if (currentUser) {
    return next()
  }

  return res.redirect('/auth/signin')
}

const userRedirect = (req, res, next) => {
  const currentUser = req.session?.user

  if (currentUser) {
    return res.redirect('/pictures')
  }

  return next()
}

module.exports = {
  checkAuth,
  userRedirect,
}
