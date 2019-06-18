const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("http://localhost:3001");
  } else {
    next();
  }
};

module.exports = authCheck;
