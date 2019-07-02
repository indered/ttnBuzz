const superCheck = (req, res, next) => {
  if (req.user.isAdmin && req.user.email === "mahesh.singh@tothenew.com") {
    next();
  } else {
    let err = new Error("Not Authorised");
    err.status = 500;
    return next(err);
  }
};

module.exports = superCheck;
