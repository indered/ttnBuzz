const adminCheck = (req, res, next) => {
  if (!req.user.isAdmin) {
    let err = new Error("Not Authorised");
    err.status = 500;
    return next(err);
  } else {
    next();
  }
};

module.exports = adminCheck;
