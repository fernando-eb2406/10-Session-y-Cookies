module.exports = (req, res, next) => {
  if (req.cookies.cookie) {
    req.session.userLogin = req.cookies.cookie;
  }
  next();
};
