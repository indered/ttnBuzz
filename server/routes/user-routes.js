var express = require("express"),
  router = express.Router();
var adminCheck = require("../middlewares/adminCheck");
var superCheck = require("../middlewares/superCheck");
var User = require("../models/user-model").User;

router.get("/users", (req, res, next) => {
  User.find().exec((err, users) => {
    if (err) res.send("user nhi mila");
    console.log(users);
    res.json(users);
  });
});

router.get("/", (req, res, next) => {
  if (!req.user) res.send(false);
  req.user;
  res.json(req.user);
});

//changing profile details

router.put("/", (req, res, next) => {
  User.update(req.user, {
    ...req.body
  }).then(() => {
    User.findOne({ _id: req.user._id }).then(user => {
      res.json(user);
    });
  });
});

//admin
//changing user type

router.put("/:userId/:department", (req, res, next) => {
  const id = req.params.userId;
  const type = req.params.type;
  let user = {};
  User.findById(id, (err, doc) => {
    if (err) return next(err);
    if (!doc) {
      err = new Error("Not Found");
      err.status = 404;
      return next(err);
    }
    user = doc;
  });
  User.update(user, {
    ...user,
    isAdmin: true,
    department: department
  }).then(() => {
    User.findOne({ _id: req.user._id }).then(user => {
      res.json(user);
    });
  });
});

module.exports = router;
