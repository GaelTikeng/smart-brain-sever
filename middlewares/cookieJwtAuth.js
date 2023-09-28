const jwt = require('jsonwebtoken')

exports.cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    const user = jwt.verify(token, process.env.MY_SECRET)
    req.user = user;
    next();
  }
  catch(error) {
    res.clearCookies('token')
    return res.redirect("/")
  }
}
